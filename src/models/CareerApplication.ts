import mongoose from 'mongoose';

const CareerApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  experience: String,
  coverLetter: String,
  cvUrl: String, // Cloudinary URL to PDF/DOCX
  status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.CareerApplication || mongoose.model('CareerApplication', CareerApplicationSchema);
