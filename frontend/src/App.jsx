import { useEffect, useState } from "react";
import socket from "./socket";

import JoinRoom from "./components/JoinRoom";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import ChatBox from "./components/ChatBox";
import UserList from "./components/UserList";
import Sidebar from "./components/Sidebar";
import { runCode } from "./services/codeService";

import { codeTemplates } from "./data/codeTemplates";
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
  const [typingUser, setTypingUser] = useState("");

  // Language State
  const [language, setLanguage] =
    useState("javascript");

  // =========================
  // Socket Listeners
  // =========================
  useEffect(() => {
    const handleReceiveCode = (
      newCode
    ) => {
      setCode(newCode);
    };

    const handleRoomUsers = (
      count
    ) => {
      setUserCount(count);
    };

    const handleReceiveMessage = (
      message
    ) => {
      setMessages((prev) => [
        ...prev,
        message,
      ]);
    };

    const handleUserList = (
      userList
    ) => {
      setUsers(userList);
    };

    const handleUserTyping = (
      username
    ) => {
      setTypingUser(username);

      setTimeout(() => {
        setTypingUser("");
      }, 1000);
    };

    socket.on(
      "receive-code",
      handleReceiveCode
    );

    socket.on(
      "room-users",
      handleRoomUsers
    );

    socket.on(
      "receive-message",
      handleReceiveMessage
    );

    socket.on(
      "user-list",
      handleUserList
    );

    socket.on(
      "user-typing",
      handleUserTyping
    );

    return () => {
      socket.off(
        "receive-code",
        handleReceiveCode
      );

      socket.off(
        "room-users",
        handleRoomUsers
      );

      socket.off(
        "receive-message",
        handleReceiveMessage
      );

      socket.off(
        "user-list",
        handleUserList
      );

      socket.off(
        "user-typing",
        handleUserTyping
      );
    };
  }, []);

  // =========================
  // Save Code To Local Storage
  // =========================
  useEffect(() => {
    if (!roomId) return;

    localStorage.setItem(
      roomId,
      code
    );
  }, [code, roomId]);

  // =========================
  // Join Room
  // =========================
  const joinRoom = () => {
    if (
      !roomId.trim() ||
      !username.trim()
    ) {
      alert(
        "Please enter Username and Room ID"
      );
      return;
    }

    socket.emit("join-room", {
      roomId,
      username,
    });

    const savedCode =
      localStorage.getItem(roomId);

    if (savedCode) {
      setCode(savedCode);
    }

    setJoined(true);
  };

  // =========================
  // Leave Room
  // =========================
  const leaveRoom = () => {
    setJoined(false);

    setRoomId("");
    setUsername("");

    setCode("");
    setOutput("");

    setMessages([]);
    setUsers([]);

    setTypingUser("");
    setUserCount(0);
  };

  // =========================
  // Copy Room ID
  // =========================
  const copyRoomId = () => {
    navigator.clipboard.writeText(
      roomId
    );

    alert("Room ID copied!");
  };

  // =========================
  // Code Change
  // =========================
  const handleChange = (value) => {
    setCode(value);

    socket.emit("code-change", {
      roomId,
      code: value,
    });
  };

  // =========================
  // Send Message
  // =========================
  const sendMessage = (
    message
  ) => {
    socket.emit(
      "send-message",
      {
        roomId,
        sender: username,
        text: message,
      }
    );
  };

  // =========================
  // Typing Event
  // =========================
  const handleTyping = () => {
    socket.emit("typing", {
      roomId,
      username,
    });
  };

  // =========================
  // Run Code
  // =========================
  const runCodeHandler =
    async () => {
      try {
        const result =
          await runCode(code);

        setOutput(
          result?.output ||
            result?.data?.output ||
            "No Output"
        );
      } catch (error) {
        console.error(error);

        setOutput(
          "Error running code"
        );
      }
    };


    //language
const handleLanguageChange = (
  newLanguage
) => {

  setLanguage(newLanguage);

  setCode(
    codeTemplates[newLanguage]
  );
};
    
  // =========================
  // Join Screen
  // =========================
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

  // =========================
  // Main Screen
  // =========================
  return (
    <div className="h-screen flex flex-col">
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          padding: "10px",
          background: "#111827",
          color: "white",
        }}
      >
        <div>
          Room ID: {roomId}
        </div>

        <div>
          <button
            onClick={copyRoomId}
            style={{
              marginRight: "10px",
            }}
          >
            Copy Room ID
          </button>

          <button
            onClick={leaveRoom}
          >
            Leave Room
          </button>
        </div>
      </div>

      <CodeEditor
        roomId={roomId}
        code={code}
        handleChange={
          handleChange
        }
        userCount={userCount}
        users={users}
        runCodeHandler={
          runCodeHandler
        }
        language={language}
        setLanguage={
          setLanguage
        }
      />

      <OutputConsole
        output={output}
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "10px",
        }}
      >
        <ChatBox
          messages={messages}
          sendMessage={
            sendMessage
          }
          typingUser={
            typingUser
          }
          handleTyping={
            handleTyping
          }
        />
      
      <Sidebar
  roomId={roomId}
  language={language}
  setLanguage={
    handleLanguageChange
  }
  copyRoomId={copyRoomId}
  leaveRoom={leaveRoom}
/>


        <UserList users={users} />
      </div>
    </div>
  );
}

export default App;