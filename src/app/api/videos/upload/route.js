import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/db';
import Video from '@/models/videoModel';
import Course from '@/models/courseModel';
import User from '@/models/userModel';

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('authtoken')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await dbConnect();

    const user = await User.findById(userId);
    if (!user || user.role !== 'tutor') {
      return NextResponse.json({ message: 'Only tutors can upload videos' }, { status: 403 });
    }

    const body = await req.json();
    const { courseId, title, videoUrl, thumbnailUrl } = body;

    if (!courseId || !title || !videoUrl || !thumbnailUrl) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    if (course.tutor.toString() !== userId) {
      return NextResponse.json({ message: 'You are not the tutor of this course' }, { status: 403 });
    }

    const newVideo = new Video({
      courseId,
      title,
      videoUrl,
      thumbnailUrl,
      uploadedAt: new Date(),
    });

    const savedVideo = await newVideo.save();

    course.videos.push(savedVideo._id);
    await course.save();

    return NextResponse.json(
      { message: 'Video uploaded successfully', video: savedVideo },
      { status: 201 }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Error uploading video', error: error.message }, { status: 500 });
  }
}
