import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/db';
import Course from '@/models/courseModel';
import { parse } from 'cookie';

export default async function PUT(req, res) {

  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();

    const { courseId, title, description } = req.body;

    if (!courseId || (!title && !description)) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.tutor.toString() !== decoded.userId) {
      return res.status(403).json({ message: 'You are not authorized to edit this course' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { 
        ...(title && { title }),
        ...(description && { description })
      },
      { new: true }
    );

    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error(error);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    res.status(500).json({ message: 'Server error', error: error.message });
  }
}