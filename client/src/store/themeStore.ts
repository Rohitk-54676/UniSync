import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;

  toggleTheme: () => void;

  setTheme: (theme: Theme) => void;
}

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),

  toggleTheme: () =>
    set((state) => {
      const newTheme =
        state.theme === "light"
          ? "dark"
          : "light";

      localStorage.setItem("theme", newTheme);

      document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark"
      );

      return {
        theme: newTheme,
      };
    }),

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    set({
      theme,
    });
  },
}));

export default useThemeStore;