import Editor from "@monaco-editor/react";

function CodeEditor({
  roomId,
  code,
  handleChange,
  userCount,
  runCodeHandler,
}) {
  return (
    <div>
      <h2>Room ID: {roomId}</h2>

      <h3>
        Users Online: {userCount}
      </h3>

      <button onClick={runCodeHandler}>
        Run Code
      </button>

      <Editor
        height="70vh"
        language="javascript"
        value={code}
        onChange={handleChange}
      />
    </div>
  );
}

export default CodeEditor;