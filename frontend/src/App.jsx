import { useState } from "react";
import Editor from "@monaco-editor/react";
import socket from "./socket";

function App() {
  const [code, setCode] = useState("");

  const handleChange = (value) => {
    setCode(value);
    socket.emit("code-change", value);
  };

  socket.on("receive-code", (newCode) => {
    setCode(newCode);
  });

  return (
    <div>
      <h1>Collaborative Editor</h1>

      <Editor
        height="90vh"
        language="javascript"
        value={code}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;