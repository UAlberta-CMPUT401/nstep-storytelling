/* eslint-disable max-len */
/* eslint-disable no-constant-condition */
/* eslint-disable no-self-compare */
/* renderer reference: https://stackoverflow.com/a/70809777 */
/* conditional rendering ref: https://www.pluralsight.com/guides/how-to-show-components-conditionally-react */
import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AdminNavbar from "./components/AdminNavbar";
import "./styles/App.css";
import check from "../assets/check.png";
import cross from "../assets/cross.png";

export default function AccountSettings() {
  const isSuperuser = true;

  const showManageButton = () => {
    return (
      <Link to="/manage-accounts">
        <Button variant="contained" style={{ marginTop: "200px" }}>
          Manage admins
        </Button>
      </Link>
    );
  };

  const showEditButton = () => {
    return (
      <Link to="/">
        <Button variant="contained" color="secondary" style={{ marginLeft: "30px" }}>
          edit
        </Button>
      </Link>
    );
  };

  const showInfo = () => {
    return (
      <p style={{ paddingTop: "290px" }}>
        Please contact your account manager to request email or Permissions changes, or to delete your account.
      </p>
    );
  };

  return (
    <div>
      <AdminNavbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Account settings</h1>
        <div style={{ fontSize: "25px", paddingTop: "60px" }}>
          email: pat.c@nstep.ca
          {(() => {
            if (isSuperuser) {
              return showEditButton();
            }
            return "";
          })()}
          <div>
            password: ********
            <Button variant="contained" color="secondary" style={{ marginLeft: "30px" }}>
              edit
            </Button>
          </div>
        </div>
        {/* turn the below into a component at some point */}
        <div style={{ textAlign: "center", paddingTop: "60px" }}>
          <h1 style={{ paddingBottom: "60px" }}>Permissions</h1>
          <div style={{ fontSize: "25px" }}>
            <img alt="checked checkbox" src={check} style={{ width: "30px", height: "30px", marginLeft: "30px" }} />
            Create questionnaires
            <div>
              <img alt="checked checkbox" src={check} style={{ width: "30px", height: "30px", marginLeft: "30px" }} />
              Edit others&#39; questionnaires
            </div>
            <div>
              <img alt="red-colored x" src={cross} style={{ width: "30px", height: "30px", marginLeft: "30px" }} />
              Download feedback files
            </div>
          </div>
        </div>
        <div>
          {(() => {
            if (isSuperuser) {
              return showManageButton();
            }
            return showInfo();
          })()}
        </div>
      </div>
    </div>
  );
}
