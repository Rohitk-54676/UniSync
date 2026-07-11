const TOKEN_KEY = "unisync_token";

export const tokenService = {
  save(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  get() {
    return localStorage.getItem(TOKEN_KEY);
  },

  remove() {
    localStorage.removeItem(TOKEN_KEY);
  },

  exists() {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};