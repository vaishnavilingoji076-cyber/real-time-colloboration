import socket from "../socket";

function JoinRoom({
  username,
  setUsername,
  roomId,
  setRoomId,
 // setJoined,
}) {

  const createRoom = () => {
    const randomId = Math.random()
      .toString(36)
      .substring(2, 8);

    setRoomId(randomId);
  };

  const joinRoom = () => {

    if (!roomId || !username) return;

    socket.emit("join-room", {
      roomId,
      username,
    });

   // setJoined(true);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Join Interview Room</h1>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
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