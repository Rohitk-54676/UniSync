import { useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  User,
  ChevronDown,
  CircleUserRound,
  Settings,
  LogOut,
  Shield,
  HelpCircle,
  Keyboard,
  ChevronRight,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import useClickOutside from "../../../../hooks/useClickOutside";

function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => setOpen(false));

  function handleLogout() {
    localStorage.removeItem("token");

    setOpen(false);

    navigate("/login");
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label="Open profile menu"
        className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 transition hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
          <User size={18} />
        </div>

        <ChevronDown
          size={18}
          className={`text-slate-700 transition duration-300 dark:text-slate-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.96,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute right-0 mt-3 w-80 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="border-b border-gray-200 p-6 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                  R
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Rohit Kumar
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    rohit@example.com
                  </p>

                  <span className="mt-2 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    Student
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2">
              <Link
                to="/student/profile"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-slate-700 transition hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <div className="flex items-center gap-3">
                  <CircleUserRound size={20} />

                  <span>My Profile</span>
                </div>

                <ChevronRight size={18} />
              </Link>

              <Link
                to="/student/account"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-slate-700 transition hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <div className="flex items-center gap-3">
                  <Shield size={20} />

                  <span>Account</span>
                </div>

                <ChevronRight size={18} />
              </Link>

              <Link
                to="/student/settings"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-slate-700 transition hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <div className="flex items-center gap-3">
                  <Settings size={20} />

                  <span>Settings</span>
                </div>

                <ChevronRight size={18} />
              </Link>

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-slate-700 transition hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <div className="flex items-center gap-3">
                  <Keyboard size={20} />

                  <span>Keyboard Shortcuts</span>
                </div>

                <ChevronRight size={18} />
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-slate-700 transition hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={20} />

                  <span>Help Center</span>
                </div>

                <ChevronRight size={18} />
              </button>
            </div>

            <div className="border-t border-gray-200 p-2 dark:border-slate-700">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <LogOut size={20} />

                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileDropdown;