/* eslint-disable consistent-return */
/* eslint-disable brace-style */
/* eslint-disable no-else-return */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/order */
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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import pencil from "../assets/pencil.png";
import { getUser } from "./service";

export default function AccountSettings() {
  const [isSuperuser, setIsSuperuser] = React.useState(false);
  const [emailOpen, setEmailOpen] = React.useState(false);
  const [passwordOpen, setPasswordOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const userID = localStorage.getItem("userID");

  React.useEffect(async () => {
    const res = await getUser(userID);
    if (res.is_superuser) {
      setIsSuperuser(true);
    }
  }, []);

  const handleClickEmailOpen = () => {
    setEmailOpen(true);
  };

  const handleCloseEmail = () => {
    setEmailOpen(false);
  };

  const handleCloseAndSaveEmail = (inputtedEmail) => {
    // TODO: save email to database
    setEmailOpen(false);
  };

  const handleClickPasswordOpen = () => {
    setPasswordOpen(true);
  };

  const handleCloseAndSavePassword = (inputtedEmail) => {
    // TODO: save password to database
    setPasswordOpen(false);
  };

  const handleClosePassword = () => {
    setPasswordOpen(false);
  };

  const showManageButton = () => {
    return (
      <Link to="/manage-accounts">
        <Button variant="contained" style={{ marginTop: "200px" }}>
          Manage admins
        </Button>
      </Link>
    );
  };

  const renderEditButton = () => {
    return (
      <div>
        <Button style={{ marginLeft: "30px" }} onClick={handleClickEmailOpen} startIcon={<img className="NSTEPbutton" alt="pencil" src={pencil} />} />
        <Dialog open={emailOpen} onClose={handleCloseEmail}>
          <DialogTitle>Edit email</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New email address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEmail}>Cancel</Button>
            <Button onClick={handleCloseAndSaveEmail}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  function showEditButton() {
    if (isSuperuser) {
      renderEditButton();
    }
  }

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
          {showEditButton()}
          <div>
            password: ********
            <Button style={{ marginLeft: "30px" }} onClick={handleClickPasswordOpen} startIcon={<img className="NSTEPbutton" alt="pencil" src={pencil} />} />
            <Dialog open={passwordOpen} onClose={handleClosePassword}>
              <DialogTitle>Edit password</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="New password"
                  type="password"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Confirm new password"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClosePassword}>Cancel</Button>
                <Button onClick={handleCloseAndSavePassword}>Save</Button>
              </DialogActions>
            </Dialog>
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
