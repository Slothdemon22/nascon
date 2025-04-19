import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from  "@/utils/db.js"
import Course from "@/models/courseModel.js"
import { parse } from 'cookie';

export async function POST(request) {
  try {
    // Parse cookies from request
    const cookies = parse(request.headers.cookie || '');
    const token = cookies.authToken;
    console.log('Token:', token);
    console.log("body", request.body);

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided, please login' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Database connection
    await dbConnect();

    // Get request body data
    const { title, description, thumbnailUrl } = await request.json();

    // Validate required fields
    if (!title || !description || !thumbnailUrl) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create and save new course
    const newCourse = new Course({
      title,
      description,
      thumbnailUrl,
      tutor: decoded.userId,
      videos: [],
      enrolledStudents: []
    });

    const savedCourse = await newCourse.save();

    // Return successful response
    return NextResponse.json(
      { 
        message: 'Course created successfully', 
        course: savedCourse 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json(
      { 
        message: 'Error creating course', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}