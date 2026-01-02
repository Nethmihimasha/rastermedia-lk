// lib/models/Contact.ts
import mongoose, { Schema, models } from 'mongoose';

const ContactSchema = new Schema(
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
    },
    company: {
      type: String,
    },
    projectType: {
      type: String,
      required: true,
      enum: ['branding', 'web-development', 'photography', 'video-production', 'digital-marketing', 'other'],
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const Contact = models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;