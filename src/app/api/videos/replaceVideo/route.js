import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/db';
import Course from '@/models/courseModel';
import Video from '@/models/videoModel';

export async function PUT(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('authtoken')?.value;

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const body = await req.json();

    const { courseId, videoId, newVideoUrl } = body;

    if (!courseId || !videoId || !newVideoUrl) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    if (course.tutor.toString() !== decoded.userId) {
      return NextResponse.json(
        { message: 'You are not authorized to replace videos for this course' },
        { status: 403 }
      );
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 });
    }

    video.videoUrl = newVideoUrl;
    const updatedVideo = await video.save();

    // Optional: Refresh course video reference (in case you later support video cloning, etc.)
    const videoIndex = course.videos.indexOf(videoId);
    if (videoIndex > -1) {
      course.videos[videoIndex] = updatedVideo._id;
      await course.save();
    }

    return NextResponse.json({ message: 'Video replaced successfully', video: updatedVideo }, { status: 200 });

  } catch (error) {
    console.error('Error replacing video:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
