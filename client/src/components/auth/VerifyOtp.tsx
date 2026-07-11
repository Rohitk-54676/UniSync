import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import OtpInput from "./OtpInput";

import { useAuthStore } from "../../store/auth.store";
import { authService } from "../../services/auth.service";

function VerifyOtp() {
  const navigate = useNavigate();

  const location = useLocation();

  const {
    email,
    purpose,
  } = (location.state ?? {}) as {
    email: string;
    purpose: "register" | "forgot-password";
  };

  const verifyRegisterOtp =
    useAuthStore(
      (state) => state.verifyRegisterOtp
    );

  const [otp, setOtp] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [countdown, setCountdown] =
    useState(60);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (!email || !purpose) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [email, purpose, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Enter the 6 digit OTP.");
      return;
    }

    try {
      setLoading(true);

      setError("");

     if (purpose === "register") {
  const user = await verifyRegisterOtp(
    email,
    otp
  );

  if (user.role === "admin") {
        navigate("/admin", {
          replace: true,
        });
      } else {
        navigate("/student", {
          replace: true,
        });
      }

      return;
    }

      await authService.verifyForgotPassword(
        email,
        otp
      );

      navigate(
        "/forgot-password/reset",
        {
          state: {
            email,
          },
        }
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      setError("");

      setSuccess("");

      await authService.resendOtp(
        email,
        purpose
      );

      setSuccess(
        "OTP sent successfully."
      );

      setCountdown(60);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Unable to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">

      <h1 className="text-3xl font-bold">
        Verify OTP
      </h1>

      <p className="mt-2 text-slate-500">
        Enter the OTP sent to
      </p>

      <p className="mb-8 font-semibold">
        {email}
      </p>

      <OtpInput
        value={otp}
        onChange={setOtp}
        disabled={loading}
      />
            {error && (
        <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-600 dark:border-red-700 dark:bg-red-900/20">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 rounded-xl border border-green-300 bg-green-50 p-3 text-sm text-green-600 dark:border-green-700 dark:bg-green-900/20">
          {success}
        </div>
      )}

      <button
        type="button"
        onClick={handleVerify}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <div className="mt-6 text-center">
        {countdown > 0 ? (
          <p className="text-sm text-slate-500">
            Resend OTP in{" "}
            <span className="font-semibold">
              {countdown}
            </span>{" "}
            seconds
          </p>
        ) : (
          <button
            type="button"
            disabled={resending}
            onClick={handleResend}
            className="font-semibold text-blue-600 transition hover:underline disabled:opacity-50"
          >
            {resending
              ? "Sending..."
              : "Resend OTP"}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          if (purpose === "register") {
            navigate("/register");
          } else {
            navigate("/forgot-password");
          }
        }}
        className="mt-6 w-full rounded-xl border border-slate-300 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        Back
      </button>

    </div>
  );
}

export default VerifyOtp;