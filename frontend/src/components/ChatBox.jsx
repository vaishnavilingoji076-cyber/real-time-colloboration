import { useState } from "react";

function ChatBox({
  messages,
  sendMessage,
}) {
  const [text, setText] =
    useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);

    setText("");
  };

  return (
    <div
      style={{
        background: "#111827",
        padding: "15px",
        borderRadius: "10px",
        width: "300px",
      }}
    >
      <h3>Chat</h3>

      <div
        style={{
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
          background: "#1f2937",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {messages.map(
          (msg, index) => (
            <p key={index}>
            <strong>{msg.sender}</strong>
              {msg}
            </p>
          )
        )}
      </div>

      <input
        type="text"
        value={text}
        placeholder="Type message..."
        onChange={(e) =>
          setText(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={handleSend}
        style={{
          width: "100%",
          padding: "10px",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatBox;