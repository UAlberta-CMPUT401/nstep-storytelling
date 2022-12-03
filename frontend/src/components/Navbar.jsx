import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../../assets/NSTEP_Horizontal-Logo_Color_WithTagline.png';

const Navbar = () => (
  <div className="navbar">
    <a id="logo-link" href="https://nstep.ca/"><img src={logo} aria-label="NSTEP logo" className="navbar-logo" /></a>
    <Link to="/" className="navbar-name">Tell your story</Link>
  </div>
);

export default Navbar;
