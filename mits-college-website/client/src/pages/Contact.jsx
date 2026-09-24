import React from "react";
export default function Contact() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span>CONTACT</span>
          <h2>Contact MITS Gwalior</h2>
        </div>
      </div>
      <div className="container contact-grid page-content">
        <div>
          <h2>Get in Touch</h2>
          <p><strong>Address:</strong><br />Gola ka Mandir, Gwalior - 474005, Madhya Pradesh</p>
          <p><strong>Phone:</strong><br />+91-751-2409300</p>
          <p><strong>Email:</strong><br />info@mitsgwalior.in</p>
        </div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <textarea rows="5" placeholder="Your Message"></textarea>
          <button className="btn primary" type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
}