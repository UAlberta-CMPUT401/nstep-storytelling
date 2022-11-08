import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Navbar.css';
import logo from '../../assets/NSTEP_Horizontal-Logo_Color_WithTagline.png';
import account from "../../assets/account.png";
import home from "../../assets/home.png";
import logout from "../../assets/logout.png";
import '../styles/buttons.css';

const AdminNavbar = () => (
  <>
    <div className="navbar">
      <a id="logo-link" href="https://nstep.ca/"><img src={logo} aria-label="NSTEP logo" className="navbar-logo" /></a>
      <a href="http://localhost:8080/" className="navbar-name">Tell your story!</a>
    </div>
    <div style={{ float: "right", marginRight: "32px" }}>
      <Link to="/home">
        <img className="NSTEPbutton" alt="home" src={home} />
      </Link>
      <Link to="/account">
        <img className="NSTEPbutton" alt="account" src={account} />
      </Link>
      <Link to="/login">
        <img className="NSTEPbutton" alt="logout" src={logout} />
      </Link>
    </div>
  </>
);

export default AdminNavbar;
