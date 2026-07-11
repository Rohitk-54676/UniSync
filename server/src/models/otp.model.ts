import mongoose, { Document, Schema } from "mongoose";

export type OtpPurpose = "register" | "forgot-password";

interface IRegistrationData {
  fullName: string;
  passwordHash: string;
}

export interface IOtp extends Document {
  email: string;
  otpHash: string;
  purpose: OtpPurpose;
  registrationData?: IRegistrationData;
  verified: boolean;
  expiresAt: Date;
  attempts: number;
  resendCount: number;
  lastSentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const registrationDataSchema = new Schema<IRegistrationData>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    otpHash: {
      type: String,
      required: true,
      select: false,
    },

    purpose: {
      type: String,
      enum: ["register", "forgot-password"],
      required: true,
    },

    registrationData: {
      type: registrationDataSchema,
      required: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    resendCount: {
      type: Number,
      default: 0,
    },

    lastSentAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

otpSchema.index(
  {
    email: 1,
    purpose: 1,
  },
  {
    unique: true,
  }
);

otpSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  }
);

const Otp = mongoose.model<IOtp>("Otp", otpSchema);

export default Otp;