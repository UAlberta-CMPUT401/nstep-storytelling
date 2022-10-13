import React from 'react';
import './styles/Navbar.css';
import logo from '../assets/NSTEP_Horizontal-Logo_Color_WithTagline.png';

const Navbar = () => (
  <div className="navbar">
    <a href="https://nstep.ca/"><img src={logo} aria-label="NSTEP logo" className="navbar-logo" /></a>
    <a href="http://localhost:8080/" className="navbar-name">Tell your story!</a>
  </div>
);

export default Navbar;
