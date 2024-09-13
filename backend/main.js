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

// middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// removed in production
app.use(morgan("dev"));

// routes
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);


db().then(() => {
  app.listen(9090, () => {
    console.log("Server is running on http://localhost:9090");
  });
});
