import api from "./axios";

import type {
  AuthResponse,
  CurrentUserResponse,
  MessageResponse,
  LoginRequest,
  RegisterRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
} from "../types/auth.types";

export const registerSendOtp = async (
  data: RegisterRequest
): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    "/auth/register/send-otp",
    data
  );

  return response.data;
};

export const verifyRegisterOtp = async (
  data: VerifyOtpRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register/verify-otp",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export const forgotPasswordOtp = async (
  email: string
): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    "/auth/forgot-password/send-otp",
    {
      email,
    }
  );

  return response.data;
};

export const verifyForgotOtp = async (
  data: VerifyOtpRequest
): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    "/auth/forgot-password/verify-otp",
    data
  );

  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    "/auth/forgot-password/reset",
    data
  );

  return response.data;
};

export const resendOtp = async (
  email: string,
  purpose: "register" | "forgot-password"
): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    "/auth/otp/resend",
    {
      email,
      purpose,
    }
  );

  return response.data;
};

export const getCurrentUser =
  async (): Promise<CurrentUserResponse> => {
    const response = await api.get<CurrentUserResponse>(
      "/auth/me"
    );

    return response.data;
  };