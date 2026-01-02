// lib/models/Career.ts
import mongoose, { Schema, models } from 'mongoose';

const CareerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
    },
    cvUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Career = models.Career || mongoose.model('Career', CareerSchema);

export default Career;