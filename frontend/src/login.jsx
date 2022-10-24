/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/self-closing-comp */
import React from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Navbar from './components/Navbar';
import './styles/Login.css';

const AdminLoginPage = (props) => {
  return (
    <>
      <div className="admin-login-page-container">
        <Navbar />
        <div className="admin-login-page-body">
          <div className="admin-login-page-container3">
            <span className="admin-login-page-text03">
              <span>Admin Login</span>
              <br></br>
            </span>
          </div>
          <div className="admin-login-page-container4">
            <TextField
              id="outlined-required"
              label="Email"
            />
          </div>
          <div className="admin-login-page-container5">
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <a
            href="https://example.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span>Forgot password?</span>
            <br></br>
          </a>
          <div className="admin-login-page-container6">
            <Link to="/dashboard">
              <button className="admin-login-page-button button">Login</button>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default AdminLoginPage;
