/* eslint-disable no-constant-condition */
/* eslint-disable no-self-compare */
/* renderer reference: https://stackoverflow.com/a/70809777 */
/* conditional rendering ref: https://www.pluralsight.com/guides/how-to-show-components-conditionally-react */
import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AdminNavbar from "./components/AdminNavbar";
import "./styles/App.css";

export default function EditAdmin() {
  return (
    <div>
      <AdminNavbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Account</h1>
        <div style={{ fontSize: "25px", paddingTop: "60px" }}>
          email: pat.c@nstep.ca
          <Button variant="contained" color="secondary" style={{ marginLeft: "30px" }}>
            edit
          </Button>
        </div>
        <div style={{ textAlign: "center", paddingTop: "60px" }}>
          <h1>
            Permissions
          </h1>
          <div style={{ fontSize: "15px", paddingBottom: "60px" }}>
            Only editable by you
          </div>
          <div>
            <FormControlLabel control={<Switch defaultChecked disableRipple="true" />} label="Create questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch defaultUnChecked disableRipple="true" />} label="Edit others&#39; questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch defaultChecked disableRipple="true" />} label="Download feedback files" />
          </div>
          <div>
            <FormControlLabel control={<Switch defaultUnChecked disableRipple="true" />} label="Manage admins (superadmin)" color="warning" />
          </div>
        </div>
        <Link to="/manage-accounts">
          <Button variant="contained" style={{ marginTop: "50px" }}>
            Save & Return
          </Button>
        </Link>
        <div style={{ paddingTop: "180px" }}>
          <Link to="/delete-account">
            Delete this account
          </Link>
        </div>
      </div>
    </div>
  );
}
