import {
  loginUser,
  registerSendOtp,
  verifyRegisterOtp,
  forgotPasswordOtp,
  verifyForgotOtp,
  resetPassword as resetPasswordApi,
  resendOtp as resendOtpApi,
  getCurrentUser,
} from "../api/auth.api";

import { tokenService } from "./token.service";

import type { User } from "../types/auth.types";

export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<User> {
    const data = await loginUser({
      email,
      password,
    });

    tokenService.save(data.token);

    return data.user;
  },

  async register(
    fullName: string,
    email: string,
    password: string
  ): Promise<void> {
    await registerSendOtp({
      fullName,
      email,
      password,
    });
  },

  async verifyRegister(
    email: string,
    otp: string
  ): Promise<User> {
    const data = await verifyRegisterOtp({
      email,
      otp,
    });

    tokenService.save(data.token);

    return data.user;
  },

  async forgotPassword(
    email: string
  ): Promise<void> {
    await forgotPasswordOtp(email);
  },

  async verifyForgotPassword(
    email: string,
    otp: string
  ): Promise<void> {
    await verifyForgotOtp({
      email,
      otp,
    });
  },

  async resetPassword(
    email: string,
    newPassword: string
  ): Promise<void> {
    await resetPasswordApi({
      email,
      newPassword,
    });
  },

  async resendOtp(
    email: string,
    purpose: "register" | "forgot-password"
  ): Promise<void> {
    await resendOtpApi(
      email,
      purpose
    );
  },

  async getCurrentUser(): Promise<User> {
    const data = await getCurrentUser();

    return data.user;
  },

  logout(): void {
    tokenService.remove();
  },
};