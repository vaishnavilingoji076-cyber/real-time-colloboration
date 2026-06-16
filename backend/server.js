// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// // Store room users
// const roomUsers = {};

// io.on("connection", (socket) => {
//   console.log(
//     "User Connected:",
//     socket.id
//   );

//   // ======================
//   // JOIN ROOM
//   // ======================
//   socket.on(
//     "join-room",
//     ({ roomId, username }) => {
//       socket.join(roomId);

//       socket.roomId = roomId;
//       socket.username = username;

//       if (!roomUsers[roomId]) {
//         roomUsers[roomId] = [];
//       }

//       roomUsers[roomId].push(
//         username
//       );

//       io.to(roomId).emit(
//         "user-list",
//         roomUsers[roomId]
//       );

//       const room =
//         io.sockets.adapter.rooms.get(
//           roomId
//         );

//       const userCount =
//         room ? room.size : 0;

//       io.to(roomId).emit(
//         "room-users",
//         userCount
//       );

//       //join nofication
//       io.to(roomId).emit(
//         "receive-message",
//         {
//           sender:"System",
//           text:`${username} joined the room`,
//         }
//       );

//       console.log(
//         `${username} joined room ${roomId}`
//       );
//     }
//   );

//   // ======================
//   // CHAT
//   // ======================
//   socket.on(
//     "send-message",
//     ({ roomId, sender, text }) => {
//       io.to(roomId).emit(
//         "receive-message",
//         {
//           sender,
//           text,
//         }
//       );
//     }
//   );

//   // ======================
//   // TYPING INDICATOR
//   // ======================
//   socket.on(
//     "typing",
//     ({ roomId, username }) => {
//       socket
//         .to(roomId)
//         .emit(
//           "user-typing",
//           username
//         );
//     }
//   );

//   // ======================
//   // LIVE CODE SYNC
//   // ======================
//   socket.on(
//     "code-change",
//     ({ roomId, code }) => {
//       socket
//         .to(roomId)
//         .emit(
//           "receive-code",
//           code
//         );
//     }
//   );

//   // ======================
//   // DISCONNECT
//   // ======================
//   socket.on(
//     "disconnect",
//     () => {
//       const roomId =
//         socket.roomId;

//       if (
//         roomId &&
//         roomUsers[roomId]
//       ) {
//         roomUsers[roomId] =
//           roomUsers[roomId].filter(
//             (user) =>
//               user !==
//               socket.username
//           );

//         io.to(roomId).emit(
//           "user-list",
//           roomUsers[roomId]
//         );

//         const room =
//           io.sockets.adapter.rooms.get(
//             roomId
//           );

//         const userCount =
//           room ? room.size : 0;

//         io.to(roomId).emit(
//           "room-users",
//           userCount
//         );

//         if (
//           roomUsers[roomId]
//             .length === 0
//         ) {
//           delete roomUsers[roomId];
//         }
//       }

//       //leave notification
//       io.to(roomId).emit(
//         "receive-message",
//         {
//           sender:"System",
//           text:`${socket.username} left the room`,
//         }
//       )

//       console.log(
//         "User Disconnected:",
//         socket.id
//       );
//     }
//   );
// });

// // ======================
// // CODE RUNNER API
// // ======================
// app.post(
//   "/run",
//   (req, res) => {
//     const { code } =
//       req.body;

//     try {
//       let output = "";

//       const originalLog =
//         console.log;

//       console.log = (
//         ...args
//       ) => {
//         output +=
//           args.join(" ") +
//           "\n";
//       };

//       eval(code);

//       console.log =
//         originalLog;

//       res.json({
//         success: true,
//         output,
//       });
//     } catch (error) {
//       res.json({
//         success: false,
//         output:
//           error.message,
//       });
//     }
//   }
// );

// // ======================
// // SERVER START
// // ======================
// server.listen(
//   5000,
//   () => {
//     console.log(
//       "Server Running On Port 5000"
//     );
//   }
// );


const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const codeRoutes = require("./routes/codeRoutes");
const socketHandler = require("./socket/socketHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", codeRoutes);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketHandler(io);

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});