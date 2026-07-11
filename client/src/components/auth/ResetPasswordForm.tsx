import { useState } from "react";
import {
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordInput from "./PasswordInput";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../../lib/validators";

import { authService } from "../../services/auth.service";

function ResetPasswordForm() {
  const navigate = useNavigate();

  const location = useLocation();

  const { email } = (location.state ?? {}) as {
    email: string;
  };

  const [loading, setLoading] =
    useState(false);

  const [apiError, setApiError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(
      resetPasswordSchema
    ),
  });

  const onSubmit = async (
    data: ResetPasswordFormData
  ) => {
    try {
      setLoading(true);

      setApiError("");

      await authService.resetPassword(
        email,
        data.newPassword
      );

      alert(
        "Password changed successfully!"
      );

      navigate("/login", {
        replace: true,
      });
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message ??
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">

        <h1 className="text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mt-2 text-slate-500">
          Create your new password.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            error={
              errors.newPassword?.message
            }
            disabled={loading}
            {...register("newPassword")}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            error={
              errors.confirmPassword
                ?.message
            }
            disabled={loading}
            {...register(
              "confirmPassword"
            )}
          />
                    {apiError && (
            <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-600 dark:border-red-700 dark:bg-red-900/20">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
          </button>

          <div className="text-center text-sm text-slate-500">
            Remember your password?

            <Link
              to="/login"
              className="ml-2 font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default ResetPasswordForm;