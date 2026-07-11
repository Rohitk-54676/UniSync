import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.model";
import Otp, { OtpPurpose } from "../models/otp.model";

import generateOtp from "../utils/generateOtp";
import generateToken from "../utils/generateToken";
import sendOtpEmail from "../services/email.service";

const OTP_EXPIRY_MINUTES = 10;
const OTP_RESEND_COOLDOWN_SECONDS = 60;
const MAX_OTP_ATTEMPTS = 5;
const MAX_RESEND_COUNT = 5;

const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const createOtpExpiry = (): Date => {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
};

export const sendRegisterOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Full name, email and password are required",
      });

      return;
    }

    const normalizedFullName = fullName.trim();
    const normalizedEmail = normalizeEmail(email);

    if (
      normalizedFullName.length < 2 ||
      normalizedFullName.length > 50
    ) {
      res.status(400).json({
        success: false,
        message: "Full name must be between 2 and 50 characters",
      });

      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });

      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });

      return;
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });

      return;
    }

    const existingOtp = await Otp.findOne({
      email: normalizedEmail,
      purpose: "register",
    });

    if (existingOtp) {
      const secondsSinceLastSent = Math.floor(
        (Date.now() - existingOtp.lastSentAt.getTime()) / 1000
      );

      if (secondsSinceLastSent < OTP_RESEND_COOLDOWN_SECONDS) {
        res.status(429).json({
          success: false,
          message: `Please wait ${
            OTP_RESEND_COOLDOWN_SECONDS - secondsSinceLastSent
          } seconds before requesting another OTP`,
        });

        return;
      }
    }

    const otp = generateOtp();

    const [otpHash, passwordHash] = await Promise.all([
      bcrypt.hash(otp, 10),
      bcrypt.hash(password, 12),
    ]);

    await Otp.findOneAndUpdate(
      {
        email: normalizedEmail,
        purpose: "register",
      },
      {
        email: normalizedEmail,
        otpHash,
        purpose: "register",
        registrationData: {
          fullName: normalizedFullName,
          passwordHash,
        },
        verified: false,
        expiresAt: createOtpExpiry(),
        attempts: 0,
        resendCount: 0,
        lastSentAt: new Date(),
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    try {
      await sendOtpEmail({
        toEmail: normalizedEmail,
        fullName: normalizedFullName,
        otp,
        purpose: "register",
      });
    } catch (emailError) {
      await Otp.deleteOne({
        email: normalizedEmail,
        purpose: "register",
      });

      throw emailError;
    }

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("Send register OTP error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to send registration OTP",
    });
  }
};

export const verifyRegisterOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });

      return;
    }

    const normalizedEmail = normalizeEmail(email);

    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
      purpose: "register",
    }).select("+otpHash");

    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });

      return;
    }

    if (otpRecord.expiresAt.getTime() < Date.now()) {
      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      res.status(400).json({
        success: false,
        message: "OTP has expired",
      });

      return;
    }

    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Request a new OTP",
      });

      return;
    }

    const isOtpValid = await bcrypt.compare(
      otp.toString(),
      otpRecord.otpHash
    );

    if (!isOtpValid) {
      otpRecord.attempts += 1;

      await otpRecord.save();

      res.status(400).json({
        success: false,
        message: "Invalid OTP",
        attemptsRemaining:
          MAX_OTP_ATTEMPTS - otpRecord.attempts,
      });

      return;
    }

    if (!otpRecord.registrationData) {
      res.status(400).json({
        success: false,
        message: "Registration data not found",
      });

      return;
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      res.status(409).json({
        success: false,
        message: "Account already exists",
      });

      return;
    }

    const user = await User.create({
      fullName: otpRecord.registrationData.fullName,
      email: normalizedEmail,
      password: otpRecord.registrationData.passwordHash,
      role: "student",
    });

    await Otp.deleteOne({
      _id: otpRecord._id,
    });

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        university: user.university,
        course: user.course,
        department: user.department,
        semester: user.semester,
        isProfileCompleted: user.isProfileCompleted,
      },
    });
  } catch (error) {
    console.error("Verify register OTP error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to verify registration OTP",
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });

      return;
    }

    const normalizedEmail = normalizeEmail(email);

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

      return;
    }

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        university: user.university,
        course: user.course,
        department: user.department,
        semester: user.semester,
        isProfileCompleted: user.isProfileCompleted,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to login",
    });
  }
};

export const sendForgotPasswordOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });

      return;
    }

    const normalizedEmail = normalizeEmail(email);

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "No account found with this email",
      });

      return;
    }

    const existingOtp = await Otp.findOne({
      email: normalizedEmail,
      purpose: "forgot-password",
    });

    if (existingOtp) {
      const secondsSinceLastSent = Math.floor(
        (Date.now() - existingOtp.lastSentAt.getTime()) / 1000
      );

      if (secondsSinceLastSent < OTP_RESEND_COOLDOWN_SECONDS) {
        res.status(429).json({
          success: false,
          message: `Please wait ${
            OTP_RESEND_COOLDOWN_SECONDS - secondsSinceLastSent
          } seconds before requesting another OTP`,
        });

        return;
      }
    }

    const otp = generateOtp();

    const otpHash = await bcrypt.hash(otp, 10);

    await Otp.findOneAndUpdate(
      {
        email: normalizedEmail,
        purpose: "forgot-password",
      },
      {
        email: normalizedEmail,
        otpHash,
        purpose: "forgot-password",
        verified: false,
        expiresAt: createOtpExpiry(),
        attempts: 0,
        resendCount: 0,
        lastSentAt: new Date(),
        $unset: {
          registrationData: 1,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    try {
      await sendOtpEmail({
        toEmail: normalizedEmail,
        fullName: user.fullName,
        otp,
        purpose: "forgot-password",
      });
    } catch (emailError) {
      await Otp.deleteOne({
        email: normalizedEmail,
        purpose: "forgot-password",
      });

      throw emailError;
    }

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your email",
    });
  } catch (error) {
    console.error("Forgot password OTP error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to send password reset OTP",
    });
  }
};

export const verifyForgotPasswordOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });

      return;
    }

    const normalizedEmail = normalizeEmail(email);

    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
      purpose: "forgot-password",
    }).select("+otpHash");

    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });

      return;
    }

    if (otpRecord.expiresAt.getTime() < Date.now()) {
      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      res.status(400).json({
        success: false,
        message: "OTP has expired",
      });

      return;
    }

    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Request a new OTP",
      });

      return;
    }

    const isOtpValid = await bcrypt.compare(
      otp.toString(),
      otpRecord.otpHash
    );

    if (!isOtpValid) {
      otpRecord.attempts += 1;

      await otpRecord.save();

      res.status(400).json({
        success: false,
        message: "Invalid OTP",
        attemptsRemaining:
          MAX_OTP_ATTEMPTS - otpRecord.attempts,
      });

      return;
    }

    otpRecord.verified = true;
    otpRecord.attempts = 0;

    await otpRecord.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify forgot OTP error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to verify OTP",
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });

      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });

      return;
    }

    const normalizedEmail = normalizeEmail(email);

    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
      purpose: "forgot-password",
      verified: true,
    });

    if (!otpRecord) {
      res.status(403).json({
        success: false,
        message: "OTP verification is required",
      });

      return;
    }

    if (otpRecord.expiresAt.getTime() < Date.now()) {
      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      res.status(400).json({
        success: false,
        message: "Password reset session has expired",
      });

      return;
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    const user = await User.findOneAndUpdate(
      {
        email: normalizedEmail,
      },
      {
        password: passwordHash,
      },
      {
        new: true,
      }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    await Otp.deleteOne({
      _id: otpRecord._id,
    });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to reset password",
    });
  }
};

export const resendOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, purpose } = req.body as {
      email: string;
      purpose: OtpPurpose;
    };

    if (!email || !purpose) {
      res.status(400).json({
        success: false,
        message: "Email and OTP purpose are required",
      });

      return;
    }

    if (!["register", "forgot-password"].includes(purpose)) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP purpose",
      });

      return;
    }

    const normalizedEmail = normalizeEmail(email);

    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
      purpose,
    });

    if (!otpRecord) {
      res.status(404).json({
        success: false,
        message: "OTP request not found. Start the process again",
      });

      return;
    }

    const secondsSinceLastSent = Math.floor(
      (Date.now() - otpRecord.lastSentAt.getTime()) / 1000
    );

    if (secondsSinceLastSent < OTP_RESEND_COOLDOWN_SECONDS) {
      res.status(429).json({
        success: false,
        message: `Please wait ${
          OTP_RESEND_COOLDOWN_SECONDS - secondsSinceLastSent
        } seconds before resending OTP`,
      });

      return;
    }

    if (otpRecord.resendCount >= MAX_RESEND_COUNT) {
      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      res.status(429).json({
        success: false,
        message: "Maximum OTP resend limit reached. Start again",
      });

      return;
    }

    const user =
      purpose === "forgot-password"
        ? await User.findOne({
            email: normalizedEmail,
          })
        : null;

    const fullName =
      purpose === "register"
        ? otpRecord.registrationData?.fullName
        : user?.fullName;

    if (!fullName) {
      res.status(400).json({
        success: false,
        message: "Unable to resend OTP",
      });

      return;
    }

    const otp = generateOtp();

    otpRecord.otpHash = await bcrypt.hash(otp, 10);
    otpRecord.expiresAt = createOtpExpiry();
    otpRecord.attempts = 0;
    otpRecord.verified = false;
    otpRecord.resendCount += 1;
    otpRecord.lastSentAt = new Date();

    await otpRecord.save();

    try {
      await sendOtpEmail({
        toEmail: normalizedEmail,
        fullName,
        otp,
        purpose,
      });
    } catch (emailError) {
      console.error("Resend email error:", emailError);

      res.status(500).json({
        success: false,
        message: "Unable to resend OTP email",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "New OTP sent to your email",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to resend OTP",
    });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        university: user.university,
        course: user.course,
        department: user.department,
        semester: user.semester,
        isProfileCompleted: user.isProfileCompleted,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch user",
    });
  }
};