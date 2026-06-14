function UserList({ users }) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "15px",
        borderRadius: "10px",
        width: "250px",
      }}
    >
      <h3>Users</h3>

      {users.map((user, index) => (
        <p key={index}>
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <span
    style={{
      width: "10px",
      height: "10px",
      background: "limegreen",
      borderRadius: "50%",
      display: "inline-block",
    }}
  ></span>
    👤 {user}
</div>
        </p>
      ))}
    </div>
  );
}

export default UserList;