import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  key: string;
  consultationFee: number;
  discountPercent: number;
  currency: string;
  isDiscountActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "general",
    },
    consultationFee: {
      type: Number,
      required: true,
      min: [0, "Consultation fee cannot be negative"],
      default: 1000,
    },
    discountPercent: {
      type: Number,
      required: true,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
      default: 50,
    },
    currency: {
      type: String,
      default: "INR",
      trim: true,
    },
    isDiscountActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Helper function to get or initialize settings document
export async function getOrInitSettings(): Promise<ISettings> {
  const SettingsModel =
    (mongoose.models.Settings as Model<ISettings>) ||
    mongoose.model<ISettings>("Settings", SettingsSchema);

  let settings = await SettingsModel.findOne({ key: "general" });
  if (!settings) {
    settings = await SettingsModel.create({
      key: "general",
      consultationFee: 1000,
      discountPercent: 50,
      currency: "INR",
      isDiscountActive: true,
    });
  }
  return settings;
}

const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;
