const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on(
    "send-message",
    ({ roomId, message })=>{
      io.to(roomId).emit(
        "receive-message",
        message
      );
    }
  );

  // Join Room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    const room = io.sockets.adapter.rooms.get(roomId);
    const userCount = room ? room.size : 0;

    io.to(roomId).emit("room-users", userCount);

    console.log(`${socket.id} joined room ${roomId}`);
  });

  // Code Sync
  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("receive-code", code);
  });

  // Update user count before disconnect
  socket.on("disconnecting", () => {
    socket.rooms.forEach((roomId) => {
      if (roomId !== socket.id) {
        setTimeout(() => {
          const room = io.sockets.adapter.rooms.get(roomId);

          const userCount = room ? room.size : 0;

          io.to(roomId).emit("room-users", userCount);
        }, 100);
      }
    });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

app.post("/run", (req, res) => {
  const { code } = req.body;

  try {
    let output = "";

    const originalLog = console.log;

    console.log = (...args) => {
      output += args.join(" ") + "\n";
    };

    eval(code);

    console.log = originalLog;

    res.json({
      success: true,
      output,
    });
  } catch (error) {
    res.json({
      success: false,
      output: error.message,
    });
  }
});

server.listen(5000, () => {
  console.log("Server Running On Port 5000");
});