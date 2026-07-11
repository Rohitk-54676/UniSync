import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../../lib/validators";

import { authService } from "../../services/auth.service";

function ForgotPasswordForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (
    data: ForgotPasswordFormData
  ) => {
    try {
      setLoading(true);
      setApiError("");

      await authService.forgotPassword(
        data.email
      );

      navigate("/forgot-password/verify", {
        state: {
            email: data.email,
            purpose: "forgot-password",
        },
        });
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message ??
          "Unable to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">

        <h1 className="text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mt-2 text-slate-500">
          Enter your registered email address.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

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
              ? "Sending OTP..."
              : "Send OTP"}
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

export default ForgotPasswordForm;