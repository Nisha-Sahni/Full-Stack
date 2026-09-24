import React from "react";
import { useEffect, useState } from "react";

export default function NoticePanel() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notices")
      .then((res) => res.json())
      .then(setNotices)
      .catch(() => setNotices([
        { title: "Admissions information", date: "2026-09-20" },
        { title: "Academic calendar updates", date: "2026-09-18" },
        { title: "Training & placement notice", date: "2026-09-15" }
      ]));
  }, []);

  return (
    <aside id="notices" className="notice-panel">
      <div className="panel-title">
        <h3>Important Notices</h3>
        <span>View all →</span>
      </div>
      {notices.map((notice, index) => (
        <div className="notice" key={index}>
          <span className="notice-date">{notice.date}</span>
          <p>{notice.title}</p>
        </div>
      ))}
    </aside>
  );
}