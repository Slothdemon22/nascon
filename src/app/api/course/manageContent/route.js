import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/db';
import Course from '@/models/courseModel';

export async function PUT(req) {
  try {
    const cookie = req.headers.get('cookie') || '';
    const token = Object.fromEntries(cookie.split('; ').map(c => c.split('=')))?.authToken;

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();

    const body = await req.json();
    const { courseId, title, description } = body;

    if (!courseId || (!title && !description)) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    if (course.tutor.toString() !== decoded.userId) {
      return NextResponse.json({ message: 'You are not authorized to edit this course' }, { status: 403 });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        ...(title && { title }),
        ...(description && { description }),
      },
      { new: true }
    );

    return NextResponse.json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error(error);

    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
