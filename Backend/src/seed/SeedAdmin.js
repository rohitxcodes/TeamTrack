// seedAdmins.js
// Usage (from Backend/): node src/seed/seedAdmins.js

require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const SEED_PASSWORD = "123456";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    const hashedPassword = await bcrypt.hash(SEED_PASSWORD, 10);

    const admins = Array.from({ length: 10 }, (_, i) => {
      const n = 101 + i;
      return {
        name: `Test Admin ${n}`,
        email: `test${n}@gmail.com`,
        password: hashedPassword,
        role: "admin",
      };
    });

    await User.insertMany(admins, { ordered: false });

    console.log("✓ Seeded 10 admins: test101@gmail.com → test110@gmail.com");
    console.log("  Password for all: 123456");
  } catch (err) {
    if (err.name === "MongoBulkWriteError") {
      console.warn(`⚠ Some admins already exist, skipped duplicates`);
    } else {
      console.error("✗ Seed failed:", err.message);
      process.exit(1);
    }
  } finally {
    await mongoose.disconnect();
    console.log("✓ Disconnected");
    process.exit(0);
  }
}

seed();
