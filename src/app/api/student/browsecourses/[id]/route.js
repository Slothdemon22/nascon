import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import Course from '@/models/courseModel';
import dbConnect from '@/utils/db.js';

export async function GET() {
  try {
    await dbConnect();
    

    const courses = await Course.find({});
        
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// Get specific course details by ID
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { courseId } = body;
    
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return NextResponse.json(
        { error: 'Valid course ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch course with tutor profile
    const course = await Course.findById(courseId)
      .populate({
        path: 'tutor',
        select: 'name email role' // Tutor profile details
      });
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Format course preview data
    const coursePreview = {
      title: course.title,
      description: course.description, // This serves as the syllabus
      thumbnailUrl: course.thumbnailUrl,
      tutorProfile: course.tutor,
      totalVideos: course.videos.length,
      createdAt: course.createdAt
    };
    
    return NextResponse.json({ course: coursePreview });
  } catch (error) {
    console.error('Error fetching course details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course details' },
      { status: 500 }
    );
  }
}