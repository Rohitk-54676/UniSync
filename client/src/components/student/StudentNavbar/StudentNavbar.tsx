import { Moon, Sun } from "lucide-react";

import NavbarLinks from "./NavbarLinks";
import SearchBar from "./SearchBar";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

import useThemeStore from "../../../store/themeStore";

function StudentNavbar() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Left */}

        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            UniSync
          </h1>

          <NavbarLinks />
        </div>

        {/* Center */}

        <SearchBar />

        {/* Right */}

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}

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
            className="relative z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-slate-700 transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === "light" ? (
              <Moon size={21} />
            ) : (
              <Sun size={21} />
            )}
          </button>

          <NotificationDropdown />

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}

export default StudentNavbar;