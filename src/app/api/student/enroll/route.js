import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Course from '@/models/courseModel';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();

    // Get token from cookies
    const token = request.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check user role
    const user = await User.findById(userId);
    if (!user || user.role !== 'student') {
      return NextResponse.json(
        { message: 'Only students can enroll in courses' },
        { status: 403 }
      );
    }

    // Get course ID from request body
    const { courseId } = await request.json();
    if (!courseId) {
      return NextResponse.json(
        { message: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Find course
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if already enrolled
    if (course.enrolledStudents.includes(userId)) {
      return NextResponse.json(
        { message: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Update course and user
    course.enrolledStudents.push(userId);
    await course.save();

    user.enrolledCourses.push(courseId);
    await user.save();

    return NextResponse.json(
      { message: 'Enrolled successfully', courseId },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Enrollment failed', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}