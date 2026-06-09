import { useEffect, useState } from "react";
import socket from "./socket";

import JoinRoom from "./components/JoinRoom";
import CodeEditor from "./components/CodeEditor";
import OutputConsole from "./components/OutputConsole";
import { runCode } from "./services/codeService";
function App() {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [code, setCode] = useState("");
  const [userCount, setUserCount]=useState(0);
  const [output, setOutput]=useState("");


  useEffect(() => {
    socket.on("receive-code", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("receive-code");
    };
  }, []);

  const joinRoom = () => {
    if (!roomId) return;

    socket.emit("join-room", roomId);

    setJoined(true);
  };

  const handleChange = (value) => {
    setCode(value);

    socket.emit("code-change", {
      roomId,
      code: value,
    });
  };

  socket.on("room-users",(count)=>{
    setUserCount(count);
  });

  useEffect(() => {
  socket.on("receive-code", (newCode) => {
    setCode(newCode);
  });

  socket.on("room-users", (count) => {
    setUserCount(count);
  });

  return () => {
    socket.off("receive-code");
    socket.off("room-users");
  };
}, []);

const runCodeHandler=async()=>{
  const result = await runCode(code);

  setOutput(result.output);
};

  return !joined ? (
    <JoinRoom
      roomId={roomId}
      setRoomId={setRoomId}
      joinRoom={joinRoom}
    />
  ) : (
    <>
  <CodeEditor
    roomId={roomId}
    code={code}
    handleChange={handleChange}
    userCount={userCount}
    runCodeHandler={runCodeHandler}
  />

  <OutputConsole output={output} />
</>
  );
}

export default App;