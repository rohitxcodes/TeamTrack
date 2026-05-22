import { useState, useRef, useEffect } from "react";
import socket from "../../socket";
import { getGroupMessages, createGroupMessage } from "../../api/group.api";

export default function GroupChat({ groupId, user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (!groupId) return;

    // load last messages for this group
    let mounted = true;
    getGroupMessages(groupId)
      .then((res) => {
        const list = (res.messages || []).map((m) => ({
          id: m._id,
          text: m.text,
          sender: {
            id: m.sender?._id || m.sender?.id,
            name: m.sender?.name || m.sender?.email,
          },
          createdAt: m.createdAt,
        }));
        if (mounted) setMessages(list);
      })
      .catch(() => {
        // ignore
      });

    // join the group room
    socket.emit("joinGroup", groupId);

    const handleIncoming = (payload) => {
      const normalized = {
        id: payload._id || payload.id || String(payload.id || Date.now()),
        text: payload.text,
        sender: {
          id: payload.sender?._id || payload.sender?.id,
          name: payload.sender?.name || payload.sender?.email,
        },
        createdAt:
          payload.createdAt || payload.created_at || new Date().toISOString(),
      };

      setMessages((cur) => {
        if (cur.some((m) => m.id === normalized.id)) return cur;
        return [...cur, normalized];
      });
    };

    socket.on("chatMessage", handleIncoming);

    return () => {
      mounted = false;
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
    // Optimistic payload for UI
    const optimistic = {
      id: Date.now().toString(),
      text: trimmed,
      sender: {
        id: user?.id || user?._id,
        name: user?.name || user?.email || "You",
      },
      createdAt: new Date().toISOString(),
      groupId,
    };

    setMessages((cur) => [...cur, optimistic]);
    setText("");

    // persist to API first
    createGroupMessage(groupId, { text: trimmed })
      .then((res) => {
        const saved = res.data; // { message: 'Message saved', data: message }
        const msg = saved.data || saved; // handle either shape
        const normalized = {
          id: msg._id || msg.id,
          text: msg.text,
          sender: {
            id: msg.sender?._id || msg.sender?.id,
            name: msg.sender?.name || msg.sender?.email,
          },
          createdAt: msg.createdAt,
        };

        // replace last optimistic message if possible (best-effort)
        setMessages((cur) => {
          const last = cur[cur.length - 1];
          if (last && last.id === optimistic.id) {
            return [...cur.slice(0, -1), normalized];
          }
          if (cur.some((m) => m.id === normalized.id)) return cur;
          return [...cur, normalized];
        });

        // emit saved message to other clients
        socket.emit("chatMessage", { ...normalized, groupId });
      })
      .catch(() => {
        // keep optimistic message if save failed; optionally mark as failed
      });
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
