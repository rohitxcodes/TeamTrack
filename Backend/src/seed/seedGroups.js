const mongoose = require("mongoose");
const Group = require("../models/Group.model");
const User = require("../models/User.model");
require("dotenv").config({ path: "../.env" });

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected");
};

const seedGroups = async () => {
  try {
    // 1. Find admin1
    const admin = await User.findOne({ email: "a1@g.c" });

    if (!admin) {
      throw new Error("Admin user not found");
    }

    // 2. (Optional) delete old groups
    await Group.deleteMany();
    console.log("Old groups deleted");

    // 3. Create 10 groups
    const groups = [];

    for (let i = 1; i <= 10; i++) {
      groups.push({
        name: `g${i}`,
        createdBy: admin._id,
      });
    }

    await Group.insertMany(groups);

    console.log("10 groups created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(seedGroups);
