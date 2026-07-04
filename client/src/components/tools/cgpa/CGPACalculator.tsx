import { useState } from "react";

import { Calculator, GraduationCap } from "lucide-react";

import SemesterCalculator from "./SemesterCalculator";
import OverallCalculator from "./OverallCalculator";

import type { CalculatorMode } from "../../../types/cgpa.types";

function CGPACalculator() {
  const [mode, setMode] = useState<CalculatorMode>("semester");

  return (
    <section className="w-full">
      {/* Header */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <GraduationCap size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              CGPA Calculator
            </h1>

            <p className="mt-1 text-gray-600 dark:text-slate-400">
              Calculate your semester GPA or overall CGPA.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator */}

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        {/* Mode Tabs */}

        <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setMode("semester")}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
              mode === "semester"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
                : "text-gray-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            }`}
          >
            <Calculator size={19} />

            Semester GPA
          </button>

          <button
            type="button"
            onClick={() => setMode("overall")}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
              mode === "overall"
                ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
                : "text-gray-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            }`}
          >
            <GraduationCap size={19} />

            Overall CGPA
          </button>
        </div>

        {/* Active Calculator */}

        <div className="mt-8">
          {mode === "semester" ? (
            <SemesterCalculator />
          ) : (
            <OverallCalculator />
          )}
        </div>
      </div>
    </section>
  );
}

export default CGPACalculator;