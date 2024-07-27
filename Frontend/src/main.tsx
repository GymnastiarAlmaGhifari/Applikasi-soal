import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "@/context/auth.tsx"; // Mengimport AuthProvider

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
