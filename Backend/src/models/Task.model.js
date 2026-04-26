const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null, // null = private task
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },

    dueDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
taskSchema.index({ group: 1, status: 1 }); // list all group tasks filtered by status
taskSchema.index({ assignedTo: 1, group: 1 }); // member sees their tasks in a group
taskSchema.index({ createdBy: 1, group: 1 }); // personal tasks query

module.exports = mongoose.model("Task", taskSchema);
