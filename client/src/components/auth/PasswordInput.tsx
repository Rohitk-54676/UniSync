import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function PasswordInput({
  label,
  error,
  className = "",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={`
            w-full rounded-xl border
            border-slate-300
            bg-white
            px-4 py-3 pr-12
            text-slate-900
            outline-none
            transition

            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
            dark:focus:ring-blue-900

            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : ""
            }

            ${className}
          `}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default PasswordInput;