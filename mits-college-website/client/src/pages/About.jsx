import React from "react";
export default function About() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span>ABOUT MITS</span>
          <h2>About Madhav Institute of Technology &amp; Science</h2>
        </div>
      </div>
      <div className="container page-content">
        <h2>Our Institution</h2>
        <p>
          Madhav Institute of Technology &amp; Science (MITS), Gwalior was
          established in 1957. The institute provides an environment for
          engineering education, research, innovation and holistic student
          development.
        </p>
        <div className="info-cards">
          <div><h3>Vision</h3><p>To develop technically strong, innovative and socially responsible professionals.</p></div>
          <div><h3>Mission</h3><p>Provide quality education, encourage research and create opportunities for industry interaction.</p></div>
          <div><h3>Campus</h3><p>Located at Gola ka Mandir, Gwalior, Madhya Pradesh.</p></div>
        </div>
      </div>
    </>
  );
}