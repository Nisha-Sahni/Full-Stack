import React from "react";
const departments = [
  ["Computer Science & Engineering", "CSE"],
  ["Information Technology", "IT"],
  ["Electronics Engineering", "ECE"],
  ["Electrical Engineering", "EE"],
  ["Mechanical Engineering", "ME"],
  ["Civil Engineering", "CE"],
  ["Chemical Engineering", "CHE"],
  ["Architecture", "ARCH"]
];

export default function Departments() {
  return (
    <section id="departments" className="section">
      <div className="container">
        <div className="section-heading">
          <span>ACADEMICS</span>
          <h2>Academic Departments</h2>
          <p>Explore departments and programs offered at the institute.</p>
        </div>

        <div className="department-grid">
          {departments.map(([name, code]) => (
            <article className="department-card" key={code}>
              <div className="dept-icon">{code}</div>
              <div>
                <h3>{name}</h3>
                <p>View department information →</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}