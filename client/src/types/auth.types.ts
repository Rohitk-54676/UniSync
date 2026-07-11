export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "student" | "admin";
  profileImage: string;
  university: string;
  course: string;
  department: string;
  semester: number | null;
  isProfileCompleted: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface CurrentUserResponse {
  success: boolean;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}