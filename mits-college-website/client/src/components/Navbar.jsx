import mitsLogo from "../assets/mits-logo.png";
import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Academics", "/academics"],
  ["Admissions", "/admissions"],
  ["Placements", "/placements"],
  ["Contact", "/contact"]
];

export default function Navbar() {
  return (
    <>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>📍 Gola ka Mandir, Gwalior - 474005</span>
          <span>📞 +91-751-2409300</span>
          <span>✉ info@mitsgwalior.in</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container brand-row">
          <div className="brand">
        <img src={mitsLogo} alt="MITS Gwalior Logo" className="mits-logo" />
            <div>
              <h1>MADHAV INSTITUTE OF TECHNOLOGY &amp; SCIENCE</h1>
              <p>GWALIOR • MADHYA PRADESH</p>
            </div>
          </div>
          <div className="header-badge">
            <strong>EST. 1957</strong>
            <span>Deemed University</span>
          </div>
        </div>

        <nav className="nav">
          <div className="container nav-inner">
            {links.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}