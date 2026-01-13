// app.js: Express app setup (middleware + routes only)
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const restrictedUserOnly = require("./middleware/auth.middleware");
const authRouter = require("./routes/auth.routes");
const adminRouter = require("./routes/admin.routes");
const taskRoutes = require("./routes/task.routes");
const app = express();

connectDB();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//demo route
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/tasks", taskRoutes);

module.exports = app;
