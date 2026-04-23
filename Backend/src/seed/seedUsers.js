const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
require("dotenv").config({ path: "../.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // 1. Delete all users
    await User.deleteMany();
    console.log("Old users deleted");

    // 2. Hash password once
    const hashedPassword = await bcrypt.hash("123456", 10);

    // 3. Create 100 users
    const users = [];

    for (let i = 1; i <= 100; i++) {
      users.push({
        name: `member${i}`,
        email: `m${i}@g.c`,
        password: hashedPassword,
      });
    }

    await User.insertMany(users);

    console.log("100 users created successfully");
    const adminUsers = [];

    for (let i = 1; i <= 10; i++) {
      adminUsers.push({
        name: `admin${i}`,
        email: `a${i}@g.c`,
        password: hashedPassword,
      });
    }

    await User.insertMany(adminUsers);

    console.log("10 admin users created");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(seedUsers);
