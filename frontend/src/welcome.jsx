import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Selection from "./components/Selection";
import "./styles/App.css";

export default function Welcome() {
  return (
    <div>
      <Navbar />
      <Selection />
      <Link to="/login" style={{ float: "right", marginRight: "12px", marginBottom: "24px" }}>
        Admin Login
      </Link>
    </div>
  );
}
