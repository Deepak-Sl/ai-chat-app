const express = require('express');
const cors = require('cors');
const { listSessions, getSession, createNewSession, addMessageToSession } = require('./mockData');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// GET /api/sessions
app.get('/api/sessions', (req, res) => {
  const sessions = listSessions();
  res.json({ ok: true, sessions });
});

// GET /api/new-chat
app.get('/api/new-chat', (req, res) => {
  const session = createNewSession();
  res.json({ ok: true, session });
});

// GET /api/session/:id
app.get('/api/session/:id', (req, res) => {
  const session = getSession(req.params.id);
  if (!session) {
    return res.status(404).json({ ok: false, error: "Session not found" });
  }
  res.json({ ok: true, session });
});

// POST /api/chat/:id
app.post('/api/chat/:id', (req, res) => {
  const { question } = req.body;
  const session = getSession(req.params.id);

  if (!session) {
    return res.status(404).json({ ok: false, error: "Session not found" });
  }

  // Add user's question with timestamp
  addMessageToSession(req.params.id, { role: "user", text: question, timestamp: Date.now() });

  // Generate mock assistant response
  let response = {
    role: "assistant",
    text: `Mock answer for: "${question}"`,
    table: null,
    timestamp: Date.now() // <-- add timestamp
  };

  // Structured mock responses
  const q = question.toLowerCase();
  if (q.includes("sales")) {
    response.table = {
      columns: ["Product", "Units", "Revenue"],
      rows: [
        ["Widget A", 120, 2400],
        ["Widget B", 80, 1600],
        ["Widget C", 200, 5000]
      ]
    };
  } else if (q.includes("users")) {
    response.table = {
      columns: ["Segment", "Count"],
      rows: [
        ["Free", 3000],
        ["Pro", 500],
        ["Enterprise", 100]
      ]
    };
  }

  addMessageToSession(req.params.id, response);

  res.json({ ok: true, response });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});