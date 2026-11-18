import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAppointment extends Document {
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
  status: "New" | "Contacted" | "Scheduled" | "Completed" | "Cancelled";
  source?: "Contact Page" | "Home Page" | "Consultation Popup" | "Website";
  notes?: string;
  originalFee?: number;
  discountPercent?: number;
  amountPaid?: number;
  currency?: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Scheduled", "Completed", "Cancelled"],
      default: "New",
    },
    source: {
      type: String,
      enum: ["Contact Page", "Home Page", "Consultation Popup", "Website"],
      default: "Website",
    },
    notes: {
      type: String,
      default: "",
    },
    originalFee: {
      type: Number,
      default: 0,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    razorpayOrderId: {
      type: String,
      default: "",
    },
    razorpayPaymentId: {
      type: String,
      default: "",
    },
    razorpaySignature: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
