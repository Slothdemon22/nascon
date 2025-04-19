import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Course from '@/models/courseModel';
import Video from '@/models/videoModel';
import jwt from 'jsonwebtoken';

export async function DELETE(request) {
  try {
    // 1. Authenticate user via cookie
    const token = request.cookies.get('authToken')?.value;
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // 2. Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Connect to database
    await dbConnect();

    // 4. Get request data
    const { courseId, videoId } = await request.json();
    if (!courseId || !videoId) {
      return NextResponse.json(
        { message: 'Both courseId and videoId are required' },
        { status: 400 }
      );
    }

    // 5. Verify course ownership
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    if (course.tutor.toString() !== decoded.userId) {
      return NextResponse.json(
        { message: 'Unauthorized to modify this course' },
        { status: 403 }
      );
    }

    // 6. Delete video and update course
    await Video.findByIdAndDelete(videoId);
    
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { videos: videoId } },
      { new: true }
    );

    return NextResponse.json(
      { 
        message: 'Video deleted successfully',
        course: updatedCourse 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('DELETE Error:', error);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { message: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}