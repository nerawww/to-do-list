import "./App.jsx";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Point d'entrée principal de l'application React
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
