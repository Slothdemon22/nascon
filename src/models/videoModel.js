import mongoose from 'mongoose';


const VideoSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  transcript: [new mongoose.Schema({
    text: String,
    start: Number,
    end: Number,
  }, { _id: false })],
  uploadedAt: { type: Date, default: Date.now },
  thumbnailUrl: String
});

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
