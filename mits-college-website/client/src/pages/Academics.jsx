import React from "react";
import Departments from "../components/Departments";

export default function Academics() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span>ACADEMICS</span>
          <h2>Academic Programs &amp; Departments</h2>
        </div>
      </div>
      <Departments />
    </>
  );
}