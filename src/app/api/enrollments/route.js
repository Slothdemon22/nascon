import { NextResponse } from "next/server";
import dbConnect from '../../../utils/db.js';
import User from '../../../models/userModel.js';
import Course from '../../../models/courseModel.js';
import Enrollment from '../../../models/enrollmentModel.js';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    await dbConnect();
    
    // Get token from cookies instead of authorization header
    const token = request.cookies.get('authToken')?.value;
    
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized - No token provided' }, { status: 401 });
    }
    
    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: 'Unauthorized - Invalid token' }, { status: 401 });
    }
    
    // Find the tutor
    const tutor = await User.findOne({ 
      _id: decoded.userId,
      role: 'tutor' 
    });

    if (!tutor) {
      return NextResponse.json({ 
        message: "Unauthorized - User is not a tutor" 
      }, { status: 403 });
    }

    // Find all courses for this tutor
    const courses = await Course.find({ tutor: tutor._id });

    if (!courses.length) {
      return NextResponse.json({ 
        message: "No courses found for this tutor", 
        data: [] 
      });
    }

    // Get all course IDs
    const courseIds = courses.map(course => course._id);

    // Find all enrollments for these courses with student info
    const enrollments = await Enrollment.find({
      courseId: { $in: courseIds }
    }).populate("studentId", "name email")
      .populate("courseId", "title");

    // Group enrollments by course
    const coursesWithEnrollments = courses.map(course => {
      // Filter enrollments for this specific course
      const courseEnrollments = enrollments.filter(
        enrollment => enrollment.courseId._id.toString() === course._id.toString()
      );
      
      return {
        courseId: course._id,
        courseTitle: course.title,
        courseDescription: course.description,
        totalStudents: courseEnrollments.length,
        enrolledStudents: courseEnrollments.map(enrollment => ({
          studentId: enrollment.studentId._id,
          name: enrollment.studentId.name,
          email: enrollment.studentId.email,
          enrolledAt: enrollment.enrolledAt,
          progress: enrollment.progress
        }))
      };
    });

    return NextResponse.json({
      message: "Course enrollments retrieved successfully",
      data: coursesWithEnrollments
    });

  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}