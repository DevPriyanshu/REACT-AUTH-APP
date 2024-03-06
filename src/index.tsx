import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { SettingsProvider } from "./context/settings-context";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const rootHTMLElement = document.getElementById("root") as HTMLElement;

createRoot(rootHTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </AuthProvider>
  </BrowserRouter>
);
