import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryResult extends Document {
  title: string;
  beforeImage: string;
  afterImage: string;
  treatmentService: string;
  category?: "FACE" | "BODY" | "BREAST" | "SKIN" | "INTIMATE" | "WELLNESS";
  shortDescription?: string;
  displayOrder: number;
  status: "Draft" | "Published";
  createdAt: Date;
  updatedAt: Date;
}

const GalleryResultSchema = new Schema<IGalleryResult>(
  {
    title: {
      type: String,
      required: [true, "Result title is required"],
      trim: true,
    },
    beforeImage: {
      type: String,
      required: [true, "Before image is required"],
    },
    afterImage: {
      type: String,
      required: [true, "After image is required"],
    },
    treatmentService: {
      type: String,
      required: [true, "Treatment or Service is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "FACE",
      trim: true,
    },
    shortDescription: {
      type: String,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },
  },
  {
    timestamps: true,
  }
);

const GalleryResult: Model<IGalleryResult> =
  mongoose.models.GalleryResult ||
  mongoose.model<IGalleryResult>("GalleryResult", GalleryResultSchema);

export default GalleryResult;
