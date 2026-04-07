import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  client: string;
  category: string;
  image: string; // Cloudinary URL
  albumSlug?: string;
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  albumSlug: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
