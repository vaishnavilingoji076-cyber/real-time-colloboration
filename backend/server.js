const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("code-change", (code) => {
    socket.broadcast.emit("receive-code", code);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});