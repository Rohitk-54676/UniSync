import { Router } from "express";

import {
  sendRegisterOtp,
  verifyRegisterOtp,
  login,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword,
  resendOtp,
  getCurrentUser,
} from "../controllers/auth.controller";

import protect from "../middleware/auth.middleware";

const router = Router();

router.post("/register/send-otp", sendRegisterOtp);

router.post("/register/verify-otp", verifyRegisterOtp);

router.post("/login", login);

router.post(
  "/forgot-password/send-otp",
  sendForgotPasswordOtp
);

router.post(
  "/forgot-password/verify-otp",
  verifyForgotPasswordOtp
);

router.post(
  "/forgot-password/reset",
  resetPassword
);

router.post("/otp/resend", resendOtp);

router.get("/me", protect, getCurrentUser);

export default router;