import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
    history('/login');
  };

  const handleAccount = () => {
    history('/account');
  };

  const handleHome = () => {
    history('/home');
  };

  return (
    <div className="navbar">
      <a id="logo-link" href="https://nstep.ca/"><img src={logo} aria-label="NSTEP logo" className="navbar-logo" /></a>
      <div className="navbar-icons">
        <IconButton onClick={handleHome} sx={{ margin: "2px" }}><HomeIcon fontSize="large" color="primary" /></IconButton>
        <IconButton onClick={handleAccount} sx={{ margin: "2px" }}><AccountCircleIcon fontSize="large" color="secondary" /></IconButton>
        <IconButton onClick={logoutHandle} sx={{ margin: "2px" }}><LogoutIcon fontSize="large" color="action" /></IconButton>
      </div>
      <AlertDialog open={logoutOpen} handleAgree={handleAgree} handleClose={LogoutClose} message="Are you sure you want to log out?" />
    </div>
  );
}

export default AdminNavbar;
