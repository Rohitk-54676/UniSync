import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name is too short")
      .max(50, "Name is too long"),

    email: z.string().email("Enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "One uppercase letter required")
      .regex(/[a-z]/, "One lowercase letter required")
      .regex(/[0-9]/, "One number required")
      .regex(/[^A-Za-z0-9]/, "One special character required"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),
});
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type ResetPasswordFormData =
  z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordFormData =
  z.infer<typeof forgotPasswordSchema>;


export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;