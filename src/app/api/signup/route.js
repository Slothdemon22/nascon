import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Get request body
    const { email, password, name, role } = await request.json();
    console.log('Connected to database');

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }
    console.log('Connected to database');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role
    });

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Create response
    const response = NextResponse.json(
      {
        user: user.toObject({ transform: (doc, ret) => {
          delete ret.password;
          return ret;
        }}),
        message: 'User created successfully'
      },
      { status: 201 }
    );

    // Set secure cookie
    response.cookies.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/',
    });

    return response;

  } catch (error) {
    console.log('Error creating user:', error);
    return NextResponse.json(
      {
        message: 'Something went wrong',
        error: error.message
      },
      { status: 500 }
    );
  }
}