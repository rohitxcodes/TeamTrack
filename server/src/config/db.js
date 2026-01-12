// db.js: MongoDB connection logic using mongoose
const { log } = require("console");
const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log(`MongoDb connected successfully`);
    });
  } catch (err) {
    console.log(`Mongo Connection failed`);
  }
}
module.exports = connectDB;
