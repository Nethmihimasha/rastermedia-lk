import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  message: string;
  type: 'contact' | 'booking' | 'career';
  whatsapp?: string;
  time?: string;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: Date;
}

const InquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  type: { type: String, enum: ['contact', 'booking', 'career'], required: true },
  whatsapp: { type: String },
  time: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
