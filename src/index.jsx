import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import { HelmetProvider } from "react-helmet-async";

// Find the root element and mount the app using React 18+ API
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
