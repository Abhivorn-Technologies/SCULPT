import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  name: string;
  slug: string;
  category: string;
  isPlasticSurgery: boolean;
  featured: boolean;
  image: string;
  shortDescription: string;
  heroHeadline: string;
  introHeadline?: string;
  introParagraphs?: string[];
  understandingHeadline?: string;
  understandingParagraphs?: string[];
  benefits?: string[];
  candidateIntro?: string;
  candidateItems?: string[];
  candidateSummary?: string;
  procedureSteps?: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  recoveryParagraphs?: string[];
  pricingText?: string;
  scarsText?: string;
  safetyText?: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
    focusKeywords?: string;
    canonicalUrl?: string;
  };
  approachParagraphs?: string[];
  approachSubSections?: {
    title: string;
    content: string;
  }[];
  beforeAfterResults?: {
    id?: string;
    title: string;
    beforeImage: string;
    afterImage?: string;
    description?: string;
    tag?: string;
    isIllustrative?: boolean;
  }[];
  videos?: {
    id?: string;
    youtubeId: string;
    title: string;
    duration?: string;
    description?: string;
  }[];
  isEmpty?: boolean;
  filterCategories?: string[];
  relatedServiceSlugs?: string[];
  displayOrder: number;
  status: "Draft" | "Published";
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    isPlasticSurgery: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
    shortDescription: {
      type: String,
      default: "",
    },
    heroHeadline: {
      type: String,
      default: "",
    },
    introHeadline: {
      type: String,
      default: "",
    },
    introParagraphs: {
      type: [String],
      default: [],
    },
    understandingHeadline: {
      type: String,
      default: "",
    },
    understandingParagraphs: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    candidateIntro: {
      type: String,
      default: "",
    },
    candidateItems: {
      type: [String],
      default: [],
    },
    candidateSummary: {
      type: String,
      default: "",
    },
    procedureSteps: [
      {
        stepNumber: Number,
        title: String,
        description: String,
      },
    ],
    recoveryParagraphs: {
      type: [String],
      default: [],
    },
    pricingText: {
      type: String,
      default: "",
    },
    scarsText: {
      type: String,
      default: "",
    },
    safetyText: {
      type: String,
      default: "",
    },
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    approachParagraphs: {
      type: [String],
      default: [],
    },
    approachSubSections: [
      {
        title: String,
        content: String,
      },
    ],
    beforeAfterResults: [
      {
        id: String,
        title: String,
        beforeImage: String,
        afterImage: String,
        description: String,
        tag: String,
        isIllustrative: Boolean,
      },
    ],
    videos: [
      {
        id: String,
        youtubeId: String,
        title: String,
        duration: String,
        description: String,
      },
    ],
    isEmpty: {
      type: Boolean,
      default: false,
    },
    filterCategories: {
      type: [String],
      default: [],
    },
    relatedServiceSlugs: {
      type: [String],
      default: [],
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      focusKeywords: String,
      canonicalUrl: String,
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

export default mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
