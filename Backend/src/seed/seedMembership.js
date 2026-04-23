const mongoose = require("mongoose");
const Membership = require("../models/Membership.model");
const User = require("../models/User.model");
const Group = require("../models/Group.model");
require("dotenv").config({ path: "../.env" });

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected");
};

const seedMemberships = async () => {
  try {
    console.log("Membership:", Membership);
    // Clear old data
    await Membership.deleteMany();
    console.log("Old memberships deleted");

    const memberships = [];

    for (let i = 1; i <= 10; i++) {
      // 1. Get group
      const group = await Group.findOne({ name: `g${i}` });
      if (!group) throw new Error(`Group g${i} not found`);

      // 2. Get admin (a1 → a10)
      const admin = await User.findOne({ email: `a${i}@g.c` });
      if (!admin) throw new Error(`Admin a${i} not found`);

      // Add admin
      memberships.push({
        user: admin._id,
        group: group._id,
        role: "ADMIN",
        status: "ACTIVE",
      });

      // 3. Add 10 members per group
      const start = (i - 1) * 10 + 1;
      const end = i * 10;

      for (let j = start; j <= end; j++) {
        const member = await User.findOne({ email: `m${j}@g.c` });

        if (!member) {
          console.log(`Member m${j} not found`);
          continue;
        }

        memberships.push({
          user: member._id,
          group: group._id,
          role: "MEMBER",
          status: "ACTIVE",
        });
      }
    }

    await Membership.insertMany(memberships);

    console.log("Memberships seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(seedMemberships);
