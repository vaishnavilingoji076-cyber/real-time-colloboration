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
          👤 {user}
        </p>
      ))}
    </div>
  );
}

export default UserList;