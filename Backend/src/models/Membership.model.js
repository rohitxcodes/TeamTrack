const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "MEMBER"],
      default: "MEMBER",
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

membershipSchema.index({ user: 1, group: 1 }, { unique: true });

module.exports = mongoose.model("Membership", membershipSchema);
