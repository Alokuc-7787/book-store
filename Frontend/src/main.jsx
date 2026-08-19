import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider.jsx";
import CartProvider from "./context/CartProvider.jsx";
import axios from "axios";

axios.interceptors.request.use((config) => {
  const clientKey = import.meta.env.VITE_APP_CLIENT_KEY;
  const token = localStorage.getItem("bookstoreToken");

  config.headers = config.headers || {};

  if (clientKey) {
    config.headers["X-BookStore-Client"] = clientKey;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <div className="dark:bg-slate-900 dark:text-white">
          <Toaster position="top-right" toastOptions={{ duration: 2200 }} />
          <App />
        </div>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
