import { useEffect, useState } from "react";
import socket from "./socket";

import JoinRoom from "./components/JoinRoom";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import ChatBox from "./components/ChatBox";
import UserList from "./components/UserList";

import { runCode } from "./services/codeService";

function App() {
  // Room States
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  // Editor States
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  // User States
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);

  // Chat States
  const [messages, setMessages] = useState([]);

  // Socket Listeners
  useEffect(() => {
    const handleReceiveCode = (newCode) => {
      setCode(newCode);
    };

    const handleRoomUsers = (count) => {
      setUserCount(count);
    };

    const handleReceiveMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleUserList = (userList) => {
      setUsers(userList);
    };

    socket.on("receive-code", handleReceiveCode);
    socket.on("room-users", handleRoomUsers);
    socket.on("receive-message", handleReceiveMessage);
    socket.on("user-list", handleUserList);

    return () => {
      socket.off("receive-code", handleReceiveCode);
      socket.off("room-users", handleRoomUsers);
      socket.off("receive-message", handleReceiveMessage);
      socket.off("user-list", handleUserList);
    };
  }, []);

  // Join Room
  const joinRoom = () => {
    if (!roomId.trim() || !username.trim()) {
      alert("Please enter Username and Room ID");
      return;
    }

    socket.emit("join-room", {
      roomId,
      username,
    });

    setJoined(true);
  };

  // Code Change
  const handleChange = (value) => {
    setCode(value);

    socket.emit("code-change", {
      roomId,
      code: value,
    });
  };

  // Send Chat Message
  const sendMessage = (message) => {
    socket.emit("send-message", {
      roomId,
      username:{
        sender:username,
        text:message,
      },
    });
  };

  // Run Code
  const runCodeHandler = async () => {
    try {
      const result = await runCode(code);

      setOutput(
        result?.output ||
        result?.data?.output ||
        "No Output"
      );
    } catch (error) {
      console.error(error);
      setOutput("Error running code");
    }
  };

  // Join Screen
  if (!joined) {
    return (
      <JoinRoom
        username={username}
        setUsername={setUsername}
        roomId={roomId}
        setRoomId={setRoomId}
        joinRoom={joinRoom}
      />
    );
  }

  // Main Editor Screen
  return (
    <div className="h-screen flex flex-col">

      <CodeEditor
        roomId={roomId}
        code={code}
        handleChange={handleChange}
        userCount={userCount}
        users={users}
        runCodeHandler={runCodeHandler}
      />

      <OutputConsole
        output={output}
      />

      <ChatBox
        messages={messages}
        sendMessage={sendMessage}
      />

      <UserList users={users}/>

    </div>
  );
}

export default App;