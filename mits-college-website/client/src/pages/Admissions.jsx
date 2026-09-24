import React from "react";
export default function Admissions() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span>ADMISSIONS</span>
          <h2>Admissions at MITS Gwalior</h2>
        </div>
      </div>
      <div className="container page-content">
        <h2>Admission Information</h2>
        <p>
          This academic-project page presents a structured place for
          undergraduate, postgraduate and other admission information.
        </p>
        <div className="info-cards">
          <div><h3>Undergraduate</h3><p>Programs, eligibility and admission process can be listed here.</p></div>
          <div><h3>Postgraduate</h3><p>Program-specific eligibility and application details can be listed here.</p></div>
          <div><h3>Documents</h3><p>Keep required certificates and application documents ready.</p></div>
        </div>
      </div>
    </>
  );
}