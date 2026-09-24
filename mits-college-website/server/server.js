import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const notices = [
  { id: 1, title: "Admissions information", date: "2026-09-20" },
  { id: 2, title: "Academic calendar updates", date: "2026-09-18" },
  { id: 3, title: "Training & placement notice", date: "2026-09-15" },
  { id: 4, title: "Institute circulars and announcements", date: "2026-09-12" }
];

app.get("/", (req, res) => {
  res.json({ message: "MITS College Website API is running" });
});

app.get("/api/notices", (req, res) => {
  res.json(notices);
});

app.post("/api/notices", (req, res) => {
  const { title, date } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const notice = {
    id: notices.length + 1,
    title,
    date: date || new Date().toISOString().slice(0, 10)
  };

  notices.unshift(notice);
  res.status(201).json(notice);
});

app.listen(PORT, () => {
  console.log(`MITS API running at http://localhost:${PORT}`);
});