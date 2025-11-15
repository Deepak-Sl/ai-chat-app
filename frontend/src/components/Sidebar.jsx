import { useEffect, useState } from "react";

export default function Sidebar({ selectedSession, onSelect }) {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = () => {
    fetch("http://localhost:4000/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data.sessions));
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleNewChat = () => {
    fetch("http://localhost:4000/api/new-chat")
      .then((res) => res.json())
      .then((data) => {
        fetchSessions();
        onSelect(data.session.id);
      });
  };

  return (
    <div className="w-64 h-full border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Sessions</h2>
      <button
        onClick={handleNewChat}
        className="mb-4 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        + New Chat
      </button>

      <ul className="space-y-2 flex-1 overflow-y-auto">
        {sessions.map((s) => (
          <li
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`p-2 rounded cursor-pointer ${
              selectedSession === s.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {s.title}
          </li>
        ))}
      </ul>
    </div>
  );
}