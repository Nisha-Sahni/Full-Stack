import React, { useEffect, useMemo, useState } from "react";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

const API = "https://jsonplaceholder.typicode.com/posts";
const STORAGE_KEY = "student_academic_portal_students_v4";

const seedStudents = [
  { id: 1, name: "Emma Wilson", email: "emma@example.com", course: "Computer Science", semester: 5, marks: 94, attendance: 96 },
  { id: 2, name: "David Chen", email: "david@example.com", course: "Mechanical Engineering", semester: 6, marks: 89, attendance: 93 },
  { id: 3, name: "Aisha Khan", email: "aisha@example.com", course: "Economics", semester: 4, marks: 87, attendance: 91 },
  { id: 4, name: "Aarav Sharma", email: "aarav@example.com", course: "Computer Science", semester: 5, marks: 86, attendance: 92 },
  { id: 5, name: "Meera Singh", email: "meera@example.com", course: "Computer Science", semester: 3, marks: 84, attendance: 90 },
  { id: 6, name: "Diya Patel", email: "diya@example.com", course: "Information Technology", semester: 4, marks: 82, attendance: 95 },
  { id: 7, name: "Rohan Verma", email: "rohan@example.com", course: "Electronics", semester: 6, marks: 78, attendance: 88 },
];

const quizQuestions = [
  {
    question: "Which hook is used to manage state in a React function component?",
    options: ["useEffect", "useState", "useRouter", "useFetch"],
    answer: 1,
  },
  {
    question: "Which HTTP method is commonly used to create a new resource?",
    options: ["GET", "POST", "DELETE", "PATCH"],
    answer: 1,
  },
  {
    question: "What does CRUD stand for?",
    options: [
      "Create, Read, Update, Delete",
      "Copy, Run, Upload, Download",
      "Create, Render, Use, Deploy",
      "Code, Read, Use, Design",
    ],
    answer: 0,
  },
  {
    question: "Which browser API can persist small amounts of data locally?",
    options: ["Canvas", "Local Storage", "WebGL", "History only"],
    answer: 1,
  },
  {
    question: "Which library is used for client-side routing in this project?",
    options: ["React Router", "Axios", "Jest", "Express"],
    answer: 0,
  },
];

const emptyStudent = {
  name: "",
  email: "",
  course: "Computer Science",
  semester: 1,
  marks: 0,
  attendance: 0,
};

function readStoredStudents() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(value) && value.length ? value : null;
  } catch {
    return null;
  }
}

function App() {
  const [students, setStudents] = useState(() => readStoredStudents() || seedStudents);
  const [loadingApi, setLoadingApi] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    const saved = readStoredStudents();
    if (saved) return;

    let cancelled = false;
    async function loadFromApi() {
      setLoadingApi(true);
      try {
        const response = await fetch(API);
        if (!response.ok) throw new Error("API request failed");
        const posts = await response.json();
        if (cancelled) return;

        const apiStudents = posts.slice(0, 7).map((post, index) => ({
          id: post.id,
          name: [
            "Emma Wilson",
            "David Chen",
            "Aisha Khan",
            "Aarav Sharma",
            "Meera Singh",
            "Diya Patel",
            "Rohan Verma",
          ][index],
          email: `student${post.id}@example.com`,
          course: ["Computer Science", "Mechanical Engineering", "Economics", "Computer Science", "Computer Science", "Information Technology", "Electronics"][index],
          semester: [5, 6, 4, 5, 3, 4, 6][index],
          marks: [94, 89, 87, 86, 84, 82, 78][index],
          attendance: [96, 93, 91, 92, 90, 95, 88][index],
        }));
        setStudents(apiStudents);
      } catch {
        // Seed data remains available if the public API is unavailable.
      } finally {
        if (!cancelled) setLoadingApi(false);
      }
    }

    loadFromApi();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const addStudent = async (student) => {
    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
    } catch {}

    setStudents((current) => [...current, { ...student, id: Date.now() }]);
    setToast("Student added successfully.");
  };

  const updateStudent = async (id, student) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
    } catch {}

    setStudents((current) =>
      current.map((item) => item.id === id ? { ...item, ...student } : item)
    );
    setToast("Student updated successfully.");
  };

  const deleteStudent = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
    } catch {}

    setStudents((current) => current.filter((item) => item.id !== id));
    setToast("Student deleted successfully.");
  };

  return (
    <div className="portal">
      <Sidebar />
      <div className="main-shell">
        <Topbar loadingApi={loadingApi} />
        {toast && <div className="toast">{toast}</div>}
        <Routes>
          <Route
            path="/"
            element={<Dashboard students={students} onDelete={deleteStudent} />}
          />
          <Route
            path="/students"
            element={
              <Students
                students={students}
                onAdd={addStudent}
                onUpdate={updateStudent}
                onDelete={deleteStudent}
              />
            }
          />
          <Route
            path="/academic"
            element={<Academic students={students} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer>Powered by React | Student Academic Portal | Local Environment</footer>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">🎓</div>
        <div>
          <strong>Student</strong>
          <span>Academic Portal</span>
        </div>
      </div>

      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>⌂</span> Dashboard
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>♙</span> Students
        </NavLink>
        <NavLink to="/academic" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>▣</span> Academic
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <span>ⓘ</span> About
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="user-mini">
          <div className="avatar">P</div>
          <div>
            <strong>Professor</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ loadingApi }) {
  const location = useLocation();
  const title =
    location.pathname === "/students"
      ? "Students Records"
      : location.pathname === "/academic"
      ? "Academic Center"
      : location.pathname === "/about"
      ? "About Portal"
      : "Academic Dashboard";

  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>Student Academic Management Portal</p>
      </div>
      <div className="top-user">
        <div className="avatar">P</div>
        <div>
          <strong>Welcome,</strong>
          <span>Professor</span>
        </div>
        {loadingApi && <span className="api-status">Syncing API…</span>}
      </div>
    </header>
  );
}

function Dashboard({ students, onDelete }) {
  const avgMarks = Math.round(students.reduce((a, s) => a + Number(s.marks), 0) / Math.max(students.length, 1));
  const avgAttendance = Math.round(students.reduce((a, s) => a + Number(s.attendance), 0) / Math.max(students.length, 1));
  const courses = new Set(students.map((s) => s.course)).size;
  const top = [...students].sort((a, b) => b.marks - a.marks).slice(0, 3);

  return (
    <main className="content">
      <section className="stat-grid">
        <StatCard icon="♙" title="Total Students" value={students.length} note="+3.1% this semester" />
        <StatCard icon="▥" title="Average Marks" value={`${avgMarks}%`} note="+1.2% from mid-term" light />
        <StatCard icon="▤" title="Active Courses" value={courses} note={["CS", "ME", "EN", "BA"].slice(0, courses).join(", ")} />
        <StatCard icon="%" title="Attendance" value={`${avgAttendance}%`} note="Overall average" light />
      </section>

      <section className="dashboard-panel">
        <div className="section-title">
          <div>
            <h2>Student Performance Overview</h2>
            <span>Average marks across the current student set</span>
          </div>
          <span className="view-label">View All</span>
        </div>

        <div className="performance-layout">
          <PerformanceChart students={students} />
          <TopStudents students={top} />
        </div>
      </section>

      <section className="dashboard-panel records-panel">
        <div className="section-title">
          <div>
            <h2>Recent Student Records</h2>
            <span>Manage student data with CRUD operations</span>
          </div>
          <a href="/students" className="view-label">Manage Students</a>
        </div>
        <StudentTable students={students.slice(0, 5)} onDelete={onDelete} compact />
      </section>
    </main>
  );
}

function StatCard({ icon, title, value, note, light }) {
  return (
    <div className={`stat-card ${light ? "light" : ""}`}>
      <div className="stat-icon">{icon}</div>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function PerformanceChart({ students }) {
  const values = students.slice(0, 7).map((s) => Number(s.marks));
  const width = 560;
  const height = 230;
  const pad = { left: 36, right: 18, top: 18, bottom: 35 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const points = values.map((value, i) => {
    const x = pad.left + (values.length === 1 ? innerW / 2 : (i / (values.length - 1)) * innerW);
    const y = pad.top + ((100 - value) / 40) * innerH;
    return { x, y, value, name: students[i]?.name?.split(" ")[0] || "" };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = points.length ? `${pad.left},${pad.top + innerH} ${polyline} ${points[points.length - 1].x},${pad.top + innerH}` : "";

  return (
    <div className="chart-wrap">
      <div className="chart-heading">Average Marks</div>
      <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg">
        {[60, 70, 80, 90, 100].map((v) => {
          const y = pad.top + ((100 - v) / 40) * innerH;
          return (
            <g key={v}>
              <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} className="grid-line" />
              <text x="5" y={y + 4} className="axis-text">{v}</text>
            </g>
          );
        })}
        {area && <polygon points={area} className="chart-area-fill" />}
        <polyline points={polyline} className="chart-line" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" className="chart-dot" />
            <text x={p.x} y={height - 10} textAnchor="middle" className="x-label">{p.name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function TopStudents({ students }) {
  return (
    <div className="top-students">
      <h3>Top Performing Students</h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr><th>Rank</th><th>Name</th><th>Student ID</th><th>Department</th><th>GPA</th></tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td><strong>{s.name}</strong></td>
                <td>3013000{s.id}</td>
                <td>{s.course}</td>
                <td>{(Number(s.marks) / 25).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Students({ students, onAdd, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyStudent);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return students.filter((s) =>
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.course.toLowerCase().includes(q)
    );
  }, [students, search]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    const data = {
      ...form,
      semester: Number(form.semester),
      marks: Number(form.marks),
      attendance: Number(form.attendance),
    };

    if (editing) {
      await onUpdate(editing.id, data);
    } else {
      await onAdd(data);
    }

    setEditing(null);
    setForm(emptyStudent);
  };

  const edit = (student) => {
    setEditing(student);
    setForm({ ...student });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="content">
      <section className="dashboard-panel form-panel">
        <div className="section-title">
          <div>
            <h2>{editing ? "Update Student" : "Add New Student"}</h2>
            <span>{editing ? "Edit the selected student record" : "Create a new student record"}</span>
          </div>
        </div>

        <form className="student-form" onSubmit={submit}>
          <label>Full Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" /></label>
          <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="student@example.com" /></label>
          <label>Course<input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} placeholder="Course" /></label>
          <label>Semester<input type="number" min="1" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} /></label>
          <label>Marks (%)<input type="number" min="0" max="100" value={form.marks} onChange={(e) => setForm({ ...form, marks: e.target.value })} /></label>
          <label>Attendance (%)<input type="number" min="0" max="100" value={form.attendance} onChange={(e) => setForm({ ...form, attendance: e.target.value })} /></label>
          <div className="form-actions">
            <button className="primary-btn">{editing ? "Update Student" : "Add Student"}</button>
            {editing && <button type="button" className="secondary-btn" onClick={() => { setEditing(null); setForm(emptyStudent); }}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="dashboard-panel">
        <div className="section-title records-title">
          <div>
            <h2>Student Records ({filtered.length})</h2>
            <span>Search, edit and delete student records</span>
          </div>
          <input className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." />
        </div>
        <StudentTable students={filtered} onEdit={edit} onDelete={onDelete} />
      </section>
    </main>
  );
}

function StudentTable({ students, onEdit, onDelete, compact }) {
  return (
    <div className={`table-scroll ${compact ? "compact" : ""}`}>
      <table className="records-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Course</th><th>Sem</th><th>Marks</th><th>Attendance</th>{!compact && <th>Actions</th>}</tr>
        </thead>
        <tbody>
          {students.length ? students.map((s) => (
            <tr key={s.id}>
              <td><strong>{s.name}</strong></td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{s.semester}</td>
              <td><span className="mark-badge">{s.marks}%</span></td>
              <td>{s.attendance}%</td>
              {!compact && (
                <td className="actions-cell">
                  <button onClick={() => onEdit(s)} className="small-btn edit-btn">Edit</button>
                  <button onClick={() => onDelete(s.id)} className="small-btn delete-btn">Delete</button>
                </td>
              )}
            </tr>
          )) : (
            <tr><td colSpan="7" className="empty">No students found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Academic({ students }) {
  const [tab, setTab] = useState("overview");

  return (
    <main className="content">
      <div className="academic-tabs">
        {[
          ["overview", "Overview"],
          ["performance", "Performance"],
          ["quiz", "Quiz"],
        ].map(([id, label]) => (
          <button key={id} className={tab === id ? "tab active" : "tab"} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && <AcademicOverview students={students} />}
      {tab === "performance" && <AcademicPerformance students={students} />}
      {tab === "quiz" && <Quiz />}
    </main>
  );
}

function AcademicOverview({ students }) {
  const avg = Math.round(students.reduce((a, s) => a + Number(s.marks), 0) / Math.max(students.length, 1));
  return (
    <>
      <section className="academic-cards">
        <div><span>Average Marks</span><strong>{avg}%</strong></div>
        <div><span>Average Attendance</span><strong>{Math.round(students.reduce((a, s) => a + Number(s.attendance), 0) / Math.max(students.length, 1))}%</strong></div>
        <div><span>Subjects / Courses</span><strong>{new Set(students.map((s) => s.course)).size}</strong></div>
      </section>
      <section className="dashboard-panel">
        <div className="section-title">
          <div><h2>Academic Overview</h2><span>Student-wise performance summary</span></div>
        </div>
        <div className="academic-list">
          {students.map((s) => (
            <div className="academic-row" key={s.id}>
              <div className="academic-person"><strong>{s.name}</strong><span>{s.course} · Semester {s.semester}</span></div>
              <div className="progress-block"><div className="progress-meta"><span>Marks</span><b>{s.marks}%</b></div><div className="progress"><i style={{ width: `${s.marks}%` }} /></div></div>
              <div className="attendance-box"><span>Attendance</span><strong>{s.attendance}%</strong></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function AcademicPerformance({ students }) {
  const sorted = [...students].sort((a, b) => b.marks - a.marks);
  return (
    <section className="dashboard-panel">
      <div className="section-title">
        <div><h2>Performance Analysis</h2><span>Students ordered by academic marks</span></div>
      </div>
      <div className="performance-cards">
        {sorted.map((s, i) => (
          <div className="performance-card" key={s.id}>
            <div className="performance-rank">#{i + 1}</div>
            <div><strong>{s.name}</strong><span>{s.course}</span></div>
            <b>{s.marks}%</b>
            <div className="progress"><i style={{ width: `${s.marks}%` }} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Quiz() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const question = quizQuestions[current];
  const score = quizQuestions.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0);

  const choose = (index) => {
    if (!submitted) setAnswers((prev) => ({ ...prev, [current]: index }));
  };

  if (!started) {
    return (
      <section className="quiz-hero dashboard-panel">
        <div className="quiz-icon">📝</div>
        <h2>Academic Knowledge Quiz</h2>
        <p>Test your knowledge of React, CRUD, REST APIs and web development.</p>
        <div className="quiz-info">
          <span>5 Questions</span><span>Multiple Choice</span><span>Instant Result</span>
        </div>
        <button className="primary-btn" onClick={() => setStarted(true)}>Start Quiz</button>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="quiz-result dashboard-panel">
        <div className="result-circle">{score}/{quizQuestions.length}</div>
        <h2>Quiz Completed!</h2>
        <p>You scored <strong>{Math.round((score / quizQuestions.length) * 100)}%</strong>.</p>
        <button className="primary-btn" onClick={() => { setStarted(false); setCurrent(0); setAnswers({}); setSubmitted(false); }}>Restart Quiz</button>
      </section>
    );
  }

  return (
    <section className="quiz-card dashboard-panel">
      <div className="quiz-progress"><span>Question {current + 1} of {quizQuestions.length}</span><b>{Math.round(((current + 1) / quizQuestions.length) * 100)}%</b></div>
      <div className="progress"><i style={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }} /></div>
      <h2>{question.question}</h2>
      <div className="quiz-options">
        {question.options.map((option, i) => (
          <button key={option} className={answers[current] === i ? "quiz-option selected" : "quiz-option"} onClick={() => choose(i)}>
            <span>{String.fromCharCode(65 + i)}</span>{option}
          </button>
        ))}
      </div>
      <div className="quiz-actions">
        <button className="secondary-btn" disabled={current === 0} onClick={() => setCurrent((n) => n - 1)}>Previous</button>
        {current < quizQuestions.length - 1 ? (
          <button className="primary-btn" disabled={answers[current] === undefined} onClick={() => setCurrent((n) => n + 1)}>Next</button>
        ) : (
          <button className="primary-btn" disabled={answers[current] === undefined} onClick={() => setSubmitted(true)}>Submit Quiz</button>
        )}
      </div>
    </section>
  );
}

function About() {
  return (
    <main className="content">
      <section className="dashboard-panel about-page">
        <div className="about-icon">🎓</div>
        <h2>About Student Academic Portal</h2>
        <p>This project demonstrates a responsive React-based student academic portal with component architecture, routing, CRUD operations, REST API integration, Local Storage and an integrated academic quiz.</p>
        <div className="tech-grid">
          {["React", "Vite", "React Router", "REST API", "JSONPlaceholder", "Local Storage", "CRUD", "Quiz Module"].map((item) => <div key={item}>{item}</div>)}
        </div>
      </section>
    </main>
  );
}

export default App;
