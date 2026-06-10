function Sidebar({ roomId, userCount }) {
  return (
    <div
      className="panel"
      style={{
        width: "250px",
        padding: "20px",
      }}
    >
      <h3>ROOM</h3>

      <div
        style={{
          background: "#312e81",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "15px",
        }}
      >
        {roomId}
      </div>

      <p
        style={{
          marginTop: "20px",
        }}
      >
        🟢 Users Online: {userCount}
      </p>

      <h3
        style={{
          marginTop: "30px",
        }}
      >
        LANGUAGE
      </h3>

      <select
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          background: "#1f2937",
          color: "white",
        }}
      >
        <option>JavaScript</option>
        <option>Python</option>
      </select>
    </div>
  );
}

export default Sidebar;