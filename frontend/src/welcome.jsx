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
      <Link to="/login" style={{ float: "right", paddingRight: "12px" }}>
        Admin Login
      </Link>
    </div>
  );
}
