// lib/models/Model.ts
import mongoose, { Schema, models } from 'mongoose';

const ModelSchema = new Schema(
  {
    fullName: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true },
    phone: { type: String },
    height: { type: String },
    country: { type: String },
    gender: { type: String },
    portfolioLink: { type: String },
    instagramHandle: { type: String, required: true },
    linkedinProfile: { type: String },
    twitterHandle: { type: String },
    tiktokHandle: { type: String },
    otherLinks: { type: String },
    photos: { type: [String], default: [] },
    categories: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    experience: { type: String },
    status: { type: String, enum: ['pending','reviewed','shortlisted','rejected'], default: 'pending' },
  },
  { timestamps: true }
);

const Model = models.Model || mongoose.model('Model', ModelSchema);

export default Model;
