import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";
import ThemeToggle from "./components/ThemeToggle";
import TableResponse from "./components/TableResponse";
import AnswerFeedback from "./components/AnswerFeedback";

export default function App() {
  const BASE_URL = "https://ai-chat-backend-tcel.onrender.com/api"
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch session history when session changes
  useEffect(() => {
    if (!selectedSession) return;
    fetch(`${BASE_URL}/session/${selectedSession}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.session.messages || []));
  }, [selectedSession]);

  const handleSend = (text) => {
    if (!text || !selectedSession) return;

    // Create user message immediately
    const userMessage = { role: "user", text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);

    // Send to backend
    fetch(`${BASE_URL}/chat/${selectedSession}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [...prev, data.response]);
      });
  };

  const formatTable = (msg) =>
    msg.table?.rows.map((r) =>
      Object.fromEntries(msg.table.columns.map((c, i) => [c, r[i]]))
    );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar selectedSession={selectedSession} onSelect={setSelectedSession} />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Chat App</h1>
          <ThemeToggle />
        </div>

        <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded p-4 overflow-y-auto flex flex-col gap-2 bg-white dark:bg-gray-800">
          {messages.map((msg, i) => (
            <div key={i} className="flex flex-col">
              {/* Message Bubble */}
              <div
                className={`p-2 rounded ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 dark:bg-gray-700 self-start text-gray-900 dark:text-gray-100"
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
              </div>

              {/* Table (only assistant) */}
              {msg.role === "assistant" && msg.table && (
                <TableResponse data={formatTable(msg)} />
              )}

              {/* Like/Dislike */}
              {msg.role === "assistant" && (
                <AnswerFeedback
                  onLike={() => alert("Liked")}
                  onDislike={() => alert("Disliked")}
                />
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="mt-4">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}