import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['student', 'tutor'], default: 'student' },
  coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
