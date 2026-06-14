import { useState ,useRef ,useEffect } from "react";

function ChatBox({
  messages,
  sendMessage,
  typingUser,
  handleTyping,
}) {
  const [text, setText] = useState("");

//for scrolling
  const bottomRef=useRef();
  useEffect(()=>{
    bottomRef.current?.scrollIntoView({
      behavior:"smooth",
    });
  },[messages]);

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
        color: "white",
      }}
    >
      <h3>Chat</h3>

      {/* Messages */}
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
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}: </strong>
              {msg.text}
            </p>
          ))
        )}

        {typingUser && (
          <p
            style={{
              color: "gray",
              fontStyle: "italic",
            }}
          >
            {typingUser} is typing...
          </p>
        )}
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <input
        type="text"
        value={text}
        placeholder="Type a message..."
        onChange={(e) => {
          setText(e.target.value);

          if(e.target.value.trim()){
          handleTyping();
          }
        }}

        
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "none",
          boxSizing: "border-box",
        }}
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}


export default ChatBox;