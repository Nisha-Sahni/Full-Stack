import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <div className="logo-mark small">M</div>
            <div>
              <h3>Madhav Institute of Technology &amp; Science</h3>
              <p>Gwalior, Madhya Pradesh</p>
            </div>
          </div>
          <p className="footer-text">
            A premier technical institution committed to quality education,
            research, innovation and professional development.
          </p>
        </div>

        <div>
          <h4>IMPORTANT LINKS</h4>
          <Link to="/admissions">Admissions</Link>
          <Link to="/placements">Placements</Link>
          <Link to="/academics">Academic Departments</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>QUICK ACCESS</h4>
          <a href="#notices">Notices</a>
          <a href="#departments">Departments</a>
          <a href="#highlights">Highlights</a>
        </div>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} MITS Gwalior. Academic project website.
      </div>
    </footer>
  );
}