const { v4: uuidv4 } = require('uuid');

const sessions = [
  {
    id: "session-1",
    title: "Sales Report",
    messages: [
      { role: "system", text: "Session created.", timestamp: Date.now() }
    ]
  }
];

function listSessions() {
  return sessions.map(s => ({ id: s.id, title: s.title }));
}

function getSession(id) {
  return sessions.find(s => s.id === id);
}

function createNewSession() {
  const id = uuidv4();
  const newSession = {
    id,
    title: "New Chat " + id.slice(0, 6),
    messages: [
      { role: "system", text: "New session created.", timestamp: Date.now() }
    ]
  };
  sessions.unshift(newSession);
  return newSession;
}

function addMessageToSession(id, message) {
  const session = getSession(id);
  if (!session) return null;
  session.messages.push(message);
  return session;
}

module.exports = {
  listSessions,
  getSession,
  createNewSession,
  addMessageToSession
};