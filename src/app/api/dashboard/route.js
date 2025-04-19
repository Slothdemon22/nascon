import { NextResponse } from "next/server";
import dbConnect from '../../../utils/db.js';
import User from '../../../models/userModel.js';
import Course from '../../../models/courseModel.js';
import Enrollment from '../../../models/enrollmentModel.js';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    await dbConnect();
    
    // Get token from cookies
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

    // Find all courses created by this tutor
    const tutorCourses = await Course.find({ tutor: tutor._id });

    if (!tutorCourses.length) {
      return NextResponse.json({ 
        message: "No courses found for this tutor", 
        data: [] 
      });
    }

    // Get all course IDs
    const courseIds = tutorCourses.map(course => course._id);

    // Count enrollments per course 
    const enrollmentCounts = await Enrollment.aggregate([
      { $match: { courseId: { $in: courseIds } } },
      { $group: { _id: "$courseId", studentCount: { $sum: 1 } } }
    ]);

    // Create a map of courseId -> enrollment count for faster lookup
    const enrollmentMap = {};
    enrollmentCounts.forEach(item => {
      enrollmentMap[item._id.toString()] = item.studentCount;
    });
    
    // Format the response with course details and stats
    const coursesWithStats = tutorCourses.map(course => {
      const courseId = course._id.toString();
      return {
        courseId: course._id,
        title: course.title,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        stats: {
          enrolledStudents: enrollmentMap[courseId] || 0
        }
      };
    });

    return NextResponse.json({
      message: "Tutor courses retrieved successfully",
      data: coursesWithStats
    });

  } catch (error) {
    console.error("Error fetching tutor courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutor courses" },
      { status: 500 }
    );
  }
}