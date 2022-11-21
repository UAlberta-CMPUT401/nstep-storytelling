import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AlertDialog from './logout';
import '../styles/Navbar.css';
import logo from '../../assets/NSTEP_Horizontal-Logo_Color_WithTagline.png';
import account from "../../assets/account.png";

import home from "../../assets/home.png";
import logout from "../../assets/logout.png";
import '../styles/buttons.css';

function AdminNavbar() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const history = useNavigate();

  const logoutHandle = () => {
    setLogoutOpen(true);
  };

  const LogoutClose = (event, reason) => {
    setLogoutOpen(false);
  };

  const handleAgree = () => {
    setLogoutOpen(false);
    localStorage.setItem("jwtToken", "null");
    localStorage.setItem("userID", "null");
    history('/');
  };

  return (
    <div className="navbar">
      <a id="logo-link" href="https://nstep.ca/"><img src={logo} aria-label="NSTEP logo" className="navbar-logo" /></a>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/home">
          <img className="NSTEPbutton" alt="home" src={home} />
        </Link>
        <Link to="/account">
          <img className="NSTEPbutton" alt="account" src={account} />
        </Link>
        <IconButton onClick={logoutHandle}><LogoutIcon fontSize="large" /></IconButton>
        <AlertDialog open={logoutOpen} handleAgree={handleAgree} handleClose={LogoutClose} />
      </div>
    </div>
  );
}

export default AdminNavbar;
