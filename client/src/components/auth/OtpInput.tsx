import { useRef } from "react";

interface OtpInputProps {
  value: string;
  length?: number;
  disabled?: boolean;
  onChange: (value: string) => void;
}

function OtpInput({
  value,
  length = 6,
  disabled = false,
  onChange,
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const otp = value.padEnd(length).split("");

  const handleChange = (
    index: number,
    input: string
  ) => {
    if (!/^\d?$/.test(input)) return;

    const updated = [...otp];
    updated[index] = input;

    onChange(updated.join("").trim());

    if (input && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const updated = Array(length).fill("");

    pasted.split("").forEach((digit, index) => {
      updated[index] = digit;
    });

    onChange(updated.join(""));

    inputRefs.current[
      Math.min(pasted.length, length - 1)
    ]?.focus();
  };

  return (
    <div className="flex justify-center gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          disabled={disabled}
          value={digit.trim()}
          onChange={(e) =>
            handleChange(index, e.target.value)
          }
          onKeyDown={(e) =>
            handleKeyDown(index, e)
          }
          onPaste={handlePaste}
          className="h-14 w-12 rounded-xl border border-slate-300 text-center text-xl font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      ))}
    </div>
  );
}

export default OtpInput;