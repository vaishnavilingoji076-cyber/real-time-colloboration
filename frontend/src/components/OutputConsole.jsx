function OutputConsole({ output }) {
  return (
    <div
      style={{
        background: "#111",
        color: "white",
        padding: "10px",
        minHeight: "150px",
      }}
    >
      <h3>Output</h3>

      <pre>{output}</pre>
    </div>
  );
}

export default OutputConsole;