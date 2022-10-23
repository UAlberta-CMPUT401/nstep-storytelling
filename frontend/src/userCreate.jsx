import React from "react";
import { Link } from "react-router-dom";
import ElementSelector from "./components/ElementSelector";
import Navbar from "./components/Navbar";
import "./styles/App.css";

export default function UserCreate() {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <input placeholder="First name" />
      </div>
      <div style={{ textAlign: "center" }}>

        <div style={{ textAlign: "center" }}>
          <button>
            <Link to="/submitted" style={{ textDecoration: "none" }}>
              Submit
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
