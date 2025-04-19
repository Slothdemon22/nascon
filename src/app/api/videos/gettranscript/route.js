import axios from 'axios';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import Video from '../../../models/videoModel'; 
import connectDB from '../../../../utils/db';
import fs from 'fs-extra'


const JWT_SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.authToken;
    if (!token) {
      return NextResponse.json({ error: 'Authorization token is missing' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY); 
    } catch (error) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    console.log('Student ID:', decoded.studentId); 

    const { videoId } = await req.json();
    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    await connectDB();

    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const vu = video.videoUrl;


const baseUrl = "https://api.assemblyai.com";

const headers = {
  authorization: process.env.Assembly_API,
};

const path = vu; // Path to your audio file
const audioData = await fs.readFile(path);
const uploadResponse = await axios.post(`${baseUrl}/v2/upload`, audioData, {
  headers,
});
const uploadUrl = uploadResponse.data.upload_url;

const data = {
  audio_url: uploadUrl, // You can also use a URL to an audio or video file on the web
};

const url = `${baseUrl}/v2/transcript`;
const response = await axios.post(url, data, { headers: headers });

const transcriptId = response.data.id;
const pollingEndpoint = `${baseUrl}/v2/transcript/${transcriptId}`;

while (true) {
  const pollingResponse = await axios.get(pollingEndpoint, {
    headers: headers,
  });
  const transcriptionResult = pollingResponse.data;

  if (transcriptionResult.status === "completed") {
    break;
  } else if (transcriptionResult.status === "error") {
    throw new Error(`Transcription failed: ${transcriptionResult.error}`);
  } else {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}




    video.transcription = transcriptionResult.text;
    await video.save();

    return NextResponse.json({
      text: transcriptionResult.text,
    });

  } catch (error) {
    console.error('Error during transcription:', error);
    return NextResponse.json({ error: 'Transcription failed', details: error.message }, { status: 500 });
  }
}