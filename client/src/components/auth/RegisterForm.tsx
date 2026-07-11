import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordInput from "./PasswordInput";

import {
  registerSchema,
  type RegisterFormData,
} from "../../lib/validators";

import { useAuthStore } from "../../store/auth.store";

function RegisterForm() {
  const navigate = useNavigate();

  const registerUser = useAuthStore(
    (state) => state.register
  );

  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const password = watch("password") ?? "";

  const calculateStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = calculateStrength();

  const getStrengthColor = () => {
    if (strength <= 2) return "bg-red-500";

    if (strength <= 4) return "bg-yellow-500";

    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 2) return "Weak";

    if (strength <= 4) return "Medium";

    return "Strong";
  };

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      setApiError("");

      setLoading(true);

      await registerUser(
        data.fullName,
        data.email,
        data.password
      );

      navigate("/register/verify", {
      state: {
        email: data.email,
        purpose: "register",
      },
    });
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message ??
          "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">

      <h1 className="text-3xl font-bold">
        Create your account
      </h1>

      <p className="mt-2 text-slate-500">
        Join UniSync and manage your
        university life in one place.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >

        <div>

          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            {...register("fullName")}
            placeholder="John Doe"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

        </div>
                <PasswordInput
          label="Password"
          placeholder="Create a strong password"
          error={errors.password?.message}
          disabled={loading}
          {...register("password")}
        />

        <div>

          <div className="mb-2 flex justify-between text-sm">

            <span>Password Strength</span>

            <span
              className={`font-semibold ${
                strength <= 2
                  ? "text-red-500"
                  : strength <= 4
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {getStrengthText()}
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">

            <div
              className={`h-full transition-all duration-300 ${getStrengthColor()}`}
              style={{
                width: `${strength * 20}%`,
              }}
            />

          </div>

        </div>

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          disabled={loading}
          {...register("confirmPassword")}
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
            ? "Sending OTP..."
            : "Create Account"}
        </button>

        <div className="text-center text-sm text-slate-500">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>

        </div>

      </form>
        </div>
  );
}

export default RegisterForm;