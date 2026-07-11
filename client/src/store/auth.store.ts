import { create } from "zustand";

import type { User } from "../types/auth.types";

import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";

interface AuthState {
  user: User | null;

  pendingEmail: string | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<User>;

  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;

  verifyRegisterOtp: (
    email: string,
    otp: string
  ) => Promise<User>;

  setPendingEmail: (email: string | null) => void;

  logout: () => void;

  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  pendingEmail: null,

  isAuthenticated: false,

  isLoading: true,

  async login(email, password) {
      const user = await authService.login(
        email,
        password
      );

      set({
        user,
        isAuthenticated: true,
      });

      return user;
    },

  async register(fullName, email, password) {
    await authService.register(fullName, email, password);

    set({
      pendingEmail: email,
    });
  },

  async verifyRegisterOtp(email, otp) {
    const user = await authService.verifyRegister(
      email,
      otp
    );

    set({
      user,
      pendingEmail: null,
      isAuthenticated: true,
    });

    return user;
  },

  setPendingEmail(email) {
    set({
      pendingEmail: email,
    });
  },

  logout() {
    authService.logout();

    set({
      user: null,
      pendingEmail: null,
      isAuthenticated: false,
    });
  },

  async initialize() {
    if (!tokenService.exists()) {
      set({
        isLoading: false,
      });

      return;
    }

    try {
      const user = await authService.getCurrentUser();

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      tokenService.remove();

      set({
        user: null,
        pendingEmail: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));