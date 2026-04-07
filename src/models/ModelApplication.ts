import mongoose from 'mongoose';

const ModelApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  height: String,
  country: String,
  gender: String,
  portfolioLink: String,
  instagramHandle: String,
  linkedinProfile: String,
  twitterHandle: String,
  tiktokHandle: String,
  otherLinks: String,
  categories: [String],
  languages: [String],
  photos: [String], // Array of Cloudinary URLs
  experience: String,
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ModelApplication || mongoose.model('ModelApplication', ModelApplicationSchema);
