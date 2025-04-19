import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();

    // Get request body
    const { email, password } = await request.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Create response
    const response = NextResponse.json(
      { 
        user: user.toObject({ virtuals: true }).password, // Remove password
        message: 'Login successful' 
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day in seconds
      path: '/',
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Something went wrong', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}