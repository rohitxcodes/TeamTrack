// app.js: Express app setup (middleware + routes only)
const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const restrictedUserOnly = require("./middleware/auth.middleware");
const authRouter = require("./routes/auth.routes");
const groupRouter = require("./routes/group.routes");
const invitationRouter = require("./routes/invitation.routes");
const taskRouter = require("./routes/task.routes");

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/groups", groupRouter);
app.use("/api/invitations", invitationRouter);
app.use("/api/tasks/personal", taskRouter);

module.exports = app;
