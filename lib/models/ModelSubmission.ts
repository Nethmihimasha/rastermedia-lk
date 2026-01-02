import mongoose, { Schema, models } from 'mongoose';

const ModelSubmissionSchema = new Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    age: String,
    instagram: String,
    portfolioLink: String,
    otherLinks: String,
    raw: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const ModelSubmission = models.ModelSubmission || mongoose.model('ModelSubmission', ModelSubmissionSchema);

export default ModelSubmission;
