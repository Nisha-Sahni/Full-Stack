import React from "react";
import Hero from "../components/Hero";
import Departments from "../components/Departments";
import NoticePanel from "../components/NoticePanel";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="container breadcrumb">Home / Overview</div>

      <section id="highlights" className="section welcome-section">
        <div className="container two-column">
          <div>
            <span className="section-label">MITS GWALIOR</span>
            <h2>Welcome to MITS Gwalior</h2>
            <p>
              Madhav Institute of Technology &amp; Science is a technical
              institution in Gwalior focused on education, research,
              innovation and professional development.
            </p>
            <p>
              The campus brings together academic programs, laboratories,
              student activities, training and placement opportunities.
            </p>
            <Link className="text-link" to="/about">Know more about MITS →</Link>
          </div>
          <NoticePanel />
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          <div><strong>1957</strong><span>Established</span></div>
          <div><strong>50+</strong><span>Programs &amp; Areas</span></div>
          <div><strong>12+</strong><span>Academic Departments</span></div>
          <div><strong>60+</strong><span>Years of Excellence</span></div>
        </div>
      </section>

      <Departments />
    </>
  );
}