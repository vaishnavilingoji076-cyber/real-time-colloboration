import { FaCode } from "react-icons/fa";

function Header({ roomId, userCount }) {
  return (
    <div
      style={{
        height: "70px",
        background: "#111827",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #1f2937",
      }}
    >
      <h2>
        <FaCode /> Code Interview
      </h2>

      <h3>Room: {roomId}</h3>

      <h3>👥 {userCount}</h3>
    </div>
  );
}

export default Header;