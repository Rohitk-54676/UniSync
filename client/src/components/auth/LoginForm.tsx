import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordInput from "./PasswordInput";

import {
  loginSchema,
  type LoginFormData,
} from "../../lib/validators";

import { useAuthStore } from "../../store/auth.store";

function LoginForm() {
  const navigate = useNavigate();

  const login = useAuthStore(
    (state) => state.login
  );

  const [loading, setLoading] =
    useState(false);

  const [apiError, setApiError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      setLoading(true);

      setApiError("");

      const user = await login(
        data.email,
        data.password
      );

      if (user.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/student", { replace: true });
    }
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message ??
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">

      <h1 className="text-3xl font-bold">
        Welcome Back
      </h1>

      <p className="mt-2 text-slate-500">
        Login to your UniSync account.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >

        <div>

          <label className="mb-2 block text-sm font-medium">
            Email
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
          placeholder="Enter password"
          error={errors.password?.message}
          disabled={loading}
          {...register("password")}
        />
                <div className="flex justify-end">

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center text-sm text-slate-500">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>

        </div>

      </form>

    </div>
  );
}

export default LoginForm;