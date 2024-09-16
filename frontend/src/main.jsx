import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";

<<<<<<< HEAD
axios.defaults.baseURL = `${import.meta.env.VITE_REACT_APP_BASE_URI}/api`;
=======
axios.defaults.baseURL =
  (import.meta.env.VITE_REACT_APP_BASE_URI || "http://localhost:9090") + "/api";
>>>>>>> f4bc61627c1b83015aa3cbaa8cc433cd307164e7
axios.defaults.withCredentials = true; // This is important for the cookie to be sent to the server

const theme = createTheme({
  typography: {
    fontFamily: "sans-serif",
    allVariants: { color: "white" },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Toaster position="bottom-center" />
          <App />
        </ThemeProvider>
      </Router>
    </AuthProvider>
  </StrictMode>
);
