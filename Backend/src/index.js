const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

// load env
const envResult = dotenv.config();
if (envResult.error) {
  dotenv.config({ path: path.join(__dirname, ".env") });
}

async function startServer() {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
