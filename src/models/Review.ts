import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  name: string;
  email?: string;
  text: string;
  rating: number;
  verified: boolean;
  avatar?: string;
  role?: string;
  time?: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  verified: { type: Boolean, default: false },
  avatar: { type: String },
  role: { type: String, default: 'Client' },
  time: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
