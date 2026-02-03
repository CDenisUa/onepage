// Core
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Store
import { StoreProvider } from "@/store/store.context";
import { rootStore } from "@stores";
// Components
import App from "@/App.tsx";
// Styles
import "@/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
  </StrictMode>,
)
