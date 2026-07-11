import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import useThemeStore from "./store/themeStore";
import "./index.css";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";
const savedTheme = useThemeStore.getState().theme;

document.documentElement.classList.toggle(
  "dark",
  savedTheme === "dark"
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);