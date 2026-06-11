function OutputConsole({ output }) {
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
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default OutputConsole;