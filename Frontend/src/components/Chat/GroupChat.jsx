import { useState, useRef, useEffect } from "react";
import socket from "../../socket";

export default function GroupChat({ groupId, user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (!groupId) return;
    // join the group room
    socket.emit("joinGroup", groupId);

    const handleIncoming = (payload) => {
      setMessages((cur) => [...cur, payload]);
    };

    socket.on("chatMessage", handleIncoming);

    return () => {
      socket.off("chatMessage", handleIncoming);
      socket.emit("leaveGroup", groupId);
    };
  }, [groupId]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !groupId) return;

    const payload = {
      id: Date.now().toString(),
      text: trimmed,
      sender: {
        id: user?.id || user?._id,
        name: user?.name || user?.email || "You",
      },
      createdAt: new Date().toISOString(),
      groupId,
    };

    // emit to server; the server echoes to the room, including this client
    socket.emit("chatMessage", payload);
    setText("");
  }

  return (
    <div>
      <div>
        <h2 className="tt-heading-section">Group Chat</h2>
        <p className="tt-muted text-sm">
          Chat with other members of this group.
        </p>
      </div>

      <div
        ref={listRef}
        className="mt-3 max-h-64 overflow-auto space-y-3 p-2 bg-white rounded"
      >
        {messages.length === 0 ? (
          <p className="tt-muted text-sm">
            No messages yet. Start the conversation.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg shadow-sm ${
                msg.sender.id === (user?.id || user?._id)
                  ? "bg-slate-100 ml-auto max-w-[80%]"
                  : "bg-white"
              }`}
            >
              <div className="text-xs text-slate-500">{msg.sender.name}</div>
              <div className="mt-1 text-sm text-slate-900">{msg.text}</div>
              <div className="text-xs text-slate-400 mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          className="tt-input flex-1"
          placeholder="Write a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="tt-btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}
