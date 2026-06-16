function OutputConsole({ output, clearOutput }) {
  return (
    <div
      className="panel"
      style={{
        flex: 1,
        padding: "15px",
      }}
    >
      <h3>Output</h3>

      <div
        style={{
          marginTop: "15px",
          background: "#000",
          color: "#22c55e",
          minHeight: "300px",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <pre
          style={{
            color: output.includes("Error")
              ? "red"
              : "#00ff88",
            whiteSpace: "pre-wrap",
          }}
        >
          {output || "Run code to see output"}
        </pre>

        <button
          onClick={clearOutput}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Clear Console
        </button>
      </div>
    </div>
  );
}

export default OutputConsole;