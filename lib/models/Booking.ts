// lib/models/Booking.ts
import mongoose, { Schema, models } from 'mongoose';

const BookingSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    packageType: {
      type: String,
      required: true,
      default: 'Seamless Backdrop Package',
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    preferredTime: {
      type: String,
      required: true,
    },
    additionalHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    additionalNotes: {
      type: String,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    additionalHourPrice: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Reuse model if it already exists to avoid recompiling in dev/hot-reload.
const Booking = models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking;