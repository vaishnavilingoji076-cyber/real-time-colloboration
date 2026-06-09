function JoinRoom({
  roomId,
  setRoomId,
  joinRoom,
}) {
  const createRoom = () => {
    const randomId = Math.random()
      .toString(36)
      .substring(2, 8);

    setRoomId(randomId);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Join Interview Room</h1>

      <input
        type="text"
        value={roomId}
        placeholder="Enter Room ID"
        onChange={(e) =>
          setRoomId(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={createRoom}>
        Create Room
      </button>

      <button onClick={joinRoom}>
        Join Room
      </button>
    </div>
  );
}

export default JoinRoom;