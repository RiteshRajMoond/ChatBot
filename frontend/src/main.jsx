import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URI || "http://localhost:9090/api";
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
