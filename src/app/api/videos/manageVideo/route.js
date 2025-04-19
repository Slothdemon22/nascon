import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Course from '@/models/courseModel';
import jwt from 'jsonwebtoken';

export async function PUT(request) {
  try {
    // 1. Authentication
    const token = request.cookies.get('authToken')?.value;
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // 2. Token Verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Database Connection
    await dbConnect();

    // 4. Request Validation
    const { courseId, videoOrder } = await request.json();
    if (!courseId || !videoOrder) {
      return NextResponse.json(
        { message: 'Both courseId and videoOrder are required' },
        { status: 400 }
      );
    }

    // 5. Course Verification
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    // 6. Authorization Check
    if (course.tutor.toString() !== decoded.userId) {
      return NextResponse.json(
        { message: 'Unauthorized to modify this course' },
        { status: 403 }
      );
    }

    // 7. Video Order Validation
    const videoIds = course.videos.map(video => video.toString());
    const isValidOrder = (
      videoOrder.length === videoIds.length &&
      videoOrder.every(id => videoIds.includes(id)) &&
      new Set(videoOrder).size === videoOrder.length
    );

    if (!isValidOrder) {
      return NextResponse.json(
        { message: 'Invalid video order provided' },
        { status: 400 }
      );
    }

    // 8. Update Course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { videos: videoOrder },
      { new: true }
    );

    return NextResponse.json(
      {
        message: 'Video order updated successfully',
        course: updatedCourse
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('PUT Error:', error);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { message: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { message: 'Authentication token expired' },
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