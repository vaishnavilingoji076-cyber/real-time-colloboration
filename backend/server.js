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

const roomUsers = {};

io.on("connection", (socket) => {

  console.log(
    "User Connected:",
    socket.id
  );

  // Join Room
  socket.on(
    "join-room",
    ({ roomId, username }) => {

      socket.join(roomId);

      socket.roomId = roomId;
      socket.username = username;

      if (!roomUsers[roomId]) {
        roomUsers[roomId] = [];
      }

      roomUsers[roomId].push(
        username
      );

      io.to(roomId).emit(
        "user-list",
        roomUsers[roomId]
      );

      const room =
        io.sockets.adapter.rooms.get(
          roomId
        );

      const userCount =
        room ? room.size : 0;

      io.to(roomId).emit(
        "room-users",
        userCount
      );

      console.log(
        `${username} joined room ${roomId}`
      );
    }
  );

  // Chat
  socket.on(
    "send-message",
    ({ roomId, message }) => {

      io.to(roomId).emit(
        "receive-message",
        message
      );
    }
  );

  // Code Sync
  socket.on(
    "code-change",
    ({ roomId, code }) => {

      socket.to(roomId).emit(
        "receive-code",
        code
      );
    }
  );

  // Disconnect
  socket.on(
    "disconnect",
    () => {

      const roomId =
        socket.roomId;

      if (
        roomId &&
        roomUsers[roomId]
      ) {

        roomUsers[roomId] =
          roomUsers[roomId].filter(
            (user) =>
              user !== socket.username
          );

        io.to(roomId).emit(
          "user-list",
          roomUsers[roomId]
        );

        const room =
          io.sockets.adapter.rooms.get(
            roomId
          );

        const userCount =
          room ? room.size : 0;

        io.to(roomId).emit(
          "room-users",
          userCount
        );
      }

      console.log(
        "User Disconnected:",
        socket.id
      );
    }
  );

});

// Code Runner API
app.post("/run", (req, res) => {

  const { code } = req.body;

  try {

    let output = "";

    const originalLog =
      console.log;

    console.log = (...args) => {
      output +=
        args.join(" ") + "\n";
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
  console.log(
    "Server Running On Port 5000"
  );
});