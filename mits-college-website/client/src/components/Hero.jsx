import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-copy">
          <span className="eyebrow">CAMPUS LIFE</span>
          <h2>Research, Training &amp; Placement</h2>
          <p>
            Opportunities for learning, innovation and professional growth.
            Explore academics, admissions and career opportunities at MITS Gwalior.
          </p>
          <div className="hero-buttons">
            <Link className="btn primary" to="/placements">Read More</Link>
            <Link className="btn outline" to="/admissions">Admissions</Link>
          </div>
        </div>
        <div className="hero-emblem">
          <div className="emblem-circle">MITS</div>
          <strong>1957</strong>
          <span>Gwalior</span>
        </div>
      </div>
    </section>
  );
}