// Task.model.js: Task schema definition
const mongoose = require("mongoose");
const taskShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ADMIN
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // EMPLOYEE
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("task", taskShema);
module.exports = Task;
