import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  featuredImage?: string;
  shortDescription?: string;
  content: string;
  category: string;
  author: string;
  publishDate: Date;
  status: "Draft" | "Published";
  metaTitle?: string;
  metaDescription?: string;
  relatedService?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    featuredImage: {
      type: String,
      default: "",
    },
    shortDescription: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    category: {
      type: String,
      default: "Facial Aesthetics",
    },
    author: {
      type: String,
      default: "Sculpt Team",
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },
    metaTitle: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },
    relatedService: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
