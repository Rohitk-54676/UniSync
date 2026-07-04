import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

function Hero() {
  const navigate = useNavigate();

  function handleExplore() {
    const quickToolsSection = document.getElementById("quick-tools");

    quickToolsSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-12 lg:flex-row"
    >
      {/* Left Side */}

      <motion.div
        initial={{
          opacity: 0,
          x: -80,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.8,
        }}
        className="max-w-xl"
      >
        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
          Student Productivity Platform
        </span>

        <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900 dark:text-white lg:text-7xl">
          One Platform
          <br />
          For Every
          <br />
          Student Need
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-400">
          Manage attendance, CGPA, assignments, timetable, notes and campus life
          from one powerful platform.
        </p>

        <div className="mt-10 flex gap-4">
          <Button
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>

          <Button
            onClick={handleExplore}
            // className="border border-gray-300 bg-white text-slate-900 hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-indigo-500 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
          >
            Explore
          </Button>
        </div>
      </motion.div>

      {/* Right Side */}

      <motion.div
        initial={{
          opacity: 0,
          x: 80,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.4,
          duration: 0.8,
        }}
        className="w-full max-w-lg"
      >
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white shadow-2xl dark:from-indigo-700 dark:to-violet-800">
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            Everything in One Place
          </span>

          <h2 className="mt-6 text-3xl font-bold">
            Your Complete Student Companion
          </h2>

          <p className="mt-4 text-indigo-100">
            UniSync helps students manage academics, productivity and campus
            life from a single platform.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur transition hover:bg-white/20">
              📅 Smart Timetable
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur transition hover:bg-white/20">
              📝 Assignment Manager
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur transition hover:bg-white/20">
              🤖 AI Study Assistant
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur transition hover:bg-white/20">
              🔔 Smart Notifications
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur transition hover:bg-white/20">
              ☁ Cloud Sync
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;