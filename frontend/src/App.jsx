import { useEffect, useState } from "react";
import socket from "./socket";

import JoinRoom from "./components/JoinRoom";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import ChatBox from "./components/ChatBox";

import { runCode } from "./services/codeService";

function App() {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const [userCount, setUserCount] = useState(0);

  const [messages, setMessages] = useState([]);

  // Socket Listeners
  useEffect(() => {

    socket.on("receive-code", (newCode) => {
      setCode(newCode);
    });

    socket.on("room-users", (count) => {
      setUserCount(count);
    });

    socket.on("receive-message", (message) => {
      setMessages((prev) => [
        ...prev,
        message,
      ]);
    });

    return () => {
      socket.off("receive-code");
      socket.off("room-users");
      socket.off("receive-message");
    };

  }, []);

  // Join Room
  const joinRoom = () => {

    if (!roomId) return;

    socket.emit("join-room", roomId);

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
      message,
    });
  };

  // Run Code
  const runCodeHandler = async () => {

    try {

      const result = await runCode(code);

      setOutput(result.output);

    } catch (error) {

      console.log(error);

      setOutput("Error running code");
    }
  };

  if (!joined) {
    return (
      <JoinRoom
        roomId={roomId}
        setRoomId={setRoomId}
        joinRoom={joinRoom}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col">

      <CodeEditor
        roomId={roomId}
        code={code}
        handleChange={handleChange}
        userCount={userCount}
        runCodeHandler={runCodeHandler}
      />

      <OutputConsole
        output={output}
      />

      <ChatBox
        messages={messages}
        sendMessage={sendMessage}
      />

    </div>
  );
}

export default App;