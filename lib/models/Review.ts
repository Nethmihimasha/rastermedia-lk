// lib/models/Review.ts
import mongoose, { Schema, models } from 'mongoose';

const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    isVisible: {
      type: Boolean,
      default: false, // Only visible on website after admin approval
    },
  },
  {
    timestamps: true,
  }
);

const Review = models.Review || mongoose.model('Review', ReviewSchema);

export default Review;