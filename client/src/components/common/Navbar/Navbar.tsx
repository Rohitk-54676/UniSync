import { useState } from "react";

import {
  GraduationCap,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { NavLink, useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

import type { NavbarProps } from "./Navbar.types";

import useThemeStore from "../../../store/themeStore";

function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const theme = useThemeStore((state) => state.theme);

  const toggleTheme = useThemeStore(
    (state) => state.toggleTheme
  );

  function scrollToSection(sectionId: string) {
    setMobileMenuOpen(false);

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleHomeClick() {
    setMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleLogin() {
    setMobileMenuOpen(false);

    navigate("/login");
  }

  function handleStudentHome() {
    setMobileMenuOpen(false);

    navigate("/student");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <NavLink
          to="/"
          onClick={handleHomeClick}
          className="flex items-center gap-2"
        >
          <GraduationCap
            size={30}
            className="text-indigo-600 dark:text-indigo-400"
          />

          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            UniSync
          </span>
        </NavLink>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">
          <button
            type="button"
            onClick={handleHomeClick}
            className="cursor-pointer font-medium text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("quick-tools")}
            className="cursor-pointer font-medium text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            Quick Tools
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="cursor-pointer font-medium text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            Features
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("why-unisync")}
            className="cursor-pointer font-medium text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            About
          </button>
        </nav>

        {/* Desktop Right */}

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            title={
              theme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === "light" ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleStudentHome}
              aria-label="Open student home"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <User size={20} />
            </button>
          ) : (
            <Button onClick={handleLogin}>
              Login
            </Button>
          )}
        </div>

        {/* Mobile Right */}

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === "light" ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((previous) => !previous)
            }
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden border-t border-gray-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-900"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-6 py-5">
              <button
                type="button"
                onClick={handleHomeClick}
                className="rounded-xl px-4 py-3 text-left font-medium text-slate-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
              >
                Home
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("quick-tools")
                }
                className="rounded-xl px-4 py-3 text-left font-medium text-slate-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
              >
                Quick Tools
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("features")
                }
                className="rounded-xl px-4 py-3 text-left font-medium text-slate-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
              >
                Features
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("why-unisync")
                }
                className="rounded-xl px-4 py-3 text-left font-medium text-slate-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
              >
                About
              </button>

              <div className="mt-4 border-t border-gray-200 pt-4 dark:border-slate-800">
                {isAuthenticated ? (
                  <Button
                    onClick={handleStudentHome}
                    className="w-full"
                  >
                    Open Student Home
                  </Button>
                ) : (
                  <Button
                    onClick={handleLogin}
                    className="w-full"
                  >
                    Login
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;