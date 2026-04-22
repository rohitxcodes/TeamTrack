// seed.js — Drop this in Backend/src/scripts/seed.js
// Usage: node src/scripts/seed.js
// Usage (wipe + reseed): node src/scripts/seed.js --fresh

require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const SEED_PASSWORD = "123456";
const TOTAL_USERS = 100;

async function buildUsers(hashedPassword) {
  return Array.from({ length: TOTAL_USERS }, (_, i) => {
    const n = i + 1;
    return {
      name: `Test User ${n}`,
      email: `test${n}@gmail.com`,
      password: hashedPassword,
      role: "employee",
    };
  });
}

async function seed() {
  const isFresh = process.argv.includes("--fresh");

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    if (isFresh) {
      const deleted = await User.deleteMany({
        email: { $regex: /^test\d+@gmail\.com$/ },
      });
      console.log(`✓ Wiped ${deleted.deletedCount} existing seed users`);
    }

    // Hash once — reuse for all 100 users (don't hash in a loop, it's slow)
    const hashedPassword = await bcrypt.hash(SEED_PASSWORD, 10);
    console.log("✓ Password hashed");

    const users = await buildUsers(hashedPassword);

    // insertMany with ordered: false — continues on duplicate key errors
    // so running without --fresh won't crash on already-existing emails
    const result = await User.insertMany(users, {
      ordered: false,
      rawResult: true,
    });

    const inserted =
      result.insertedCount ?? result.mongoose?.insertedCount ?? users.length;
    console.log(`✓ Seeded ${inserted} users`);
    console.log(`  Role: employee (all)`);
    console.log(`  Emails: test1@gmail.com → test100@gmail.com`);
    console.log(`  Password for all: ${SEED_PASSWORD}`);
  } catch (err) {
    // MongoBulkWriteError on duplicates — partial success is fine
    if (err.code === 11000 || err.name === "MongoBulkWriteError") {
      const inserted = err.result?.nInserted ?? 0;
      const skipped = TOTAL_USERS - inserted;
      console.warn(
        `⚠ ${inserted} inserted, ${skipped} skipped (already exist)`,
      );
      console.warn(
        `  Run with --fresh flag to wipe and reseed: node src/scripts/seed.js --fresh`,
      );
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
