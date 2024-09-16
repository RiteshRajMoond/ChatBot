const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const db = require("./config/db");
require("dotenv").config();

const morgan = require("morgan");

const userRoutes = require("./routes/user-routes");
const chatRoutes = require("./routes/chat-routes");

const app = express();

// Determine allowed origin based on environment
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_URL
    : "http://localhost:5173";

// middlewares
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Use Morgan only in development
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

db().then(() => {
  app.listen(process.env.PORT || 9090, () => {
    console.log(
      `Server is running on ${
        process.env.NODE_ENV === "production"
          ? "production URL"
          : "http://localhost:9090"
      }`
    );
  });
});
