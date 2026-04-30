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

    const http = require("http");
    const { Server } = require("socket.io");

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL?.split(",") || "http://localhost:5173",
        credentials: true,
      },
    });

    // expose io to requests via app.locals
    app.locals.io = io;

    // socket handlers
    io.on("connection", (socket) => {
      socket.on("joinGroup", (groupId) => {
        if (groupId) socket.join(groupId);
      });

      socket.on("leaveGroup", (groupId) => {
        if (groupId) socket.leave(groupId);
      });

      socket.on("chatMessage", (payload) => {
        // payload: { groupId, text, sender }
        if (payload?.groupId) {
          io.to(payload.groupId).emit("chatMessage", payload);
        }
      });
    });

    server.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
