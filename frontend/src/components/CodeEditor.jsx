import Editor from "@monaco-editor/react";

function CodeEditor({
  code,
  handleChange,
  runCodeHandler,
}) {
  return (
    <div
      className="panel"
      style={{
        flex: 2,
        padding: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h3>Editor</h3>

        <button
          onClick={runCodeHandler}
          style={{
            background: "#4f46e5",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Run Code
        </button>
      </div>

      <Editor
        height="75vh"
        theme="vs-dark"
        language="javascript"
        value={code}
        onChange={handleChange}
      />
    </div>
  );
}

export default CodeEditor;