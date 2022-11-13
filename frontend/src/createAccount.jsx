/* eslint-disable max-len */
import React from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ElementSelector from "./components/ElementSelector";
import AdminNavbar from "./components/AdminNavbar";
import TextAnswerInput from "./TextAnswerInput";
import "./styles/App.css";
import { createUser } from "./service";

export default function CreateAccount() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [passwordsMatch, setPasswordsMatch] = React.useState(false);
  const [emailFilled, setEmailFilled] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordFilled, setPasswordFilled] = React.useState(false);
  const [passwordFilledError, setPasswordFilledError] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [emailFilledError, setEmailFilledError] = React.useState(false);
  const checkAllFields = emailFilled && passwordFilled && passwordsMatch;

  const handleEmail = (e) => {
    if (e.target.value === "") {
      setEmailFilled(false);
      setEmailFilledError("Please enter an email");
    } else {
      setEmail(e.target.value);
      setEmailFilled(true);
      setEmailFilledError("");
    }
  };

  const setAccount = async () => {
    await createUser(email, password);
  };

  const handlePassword = (e) => {
    if (e.target.value === "") {
      setPasswordFilled(false);
      setPasswordFilledError("Please enter a password");
    } else {
      setPassword(e.target.value);
      setPasswordFilled(true);
      setPasswordFilledError("");
    }
  };

  const handleConfirmPassword = (e) => {
    if (e.target.value.match(password)) {
      setPasswordsMatch(true);
      setErrorText("Passwords match!");
    } else {
      setErrorText("Passwords do not match");
      setPasswordsMatch(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Add an administrator account</h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          autoComplete="off"
        >
          <div>
            <TextField id="email" label="email" type="email" error={!emailFilled} helperText={emailFilledError} onChange={handleEmail} />
          </div>
          <div>
            <TextField id="password" label="password" type="password" error={!passwordFilled} helperText={passwordFilledError} onChange={handlePassword} />
          </div>
          <div>
            <TextField id="confirm-password" label="confirm password" error={!passwordsMatch} type="password" helperText={errorText} onChange={handleConfirmPassword} />
          </div>

        </Box>
        <div style={{ textAlign: "center" }}>
          <FormControlLabel control={<Checkbox defaultChecked disableRipple="true" />} label="Send a copy of these credentials to you and this person&#39;s email" />
        </div>
        <div style={{ textAlign: "center" }}>
          <h1>Permissions</h1>
          <div>
            <FormControlLabel control={<Switch defaultChecked={false} disableRipple="true" />} label="Create questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch defaultChecked={false} disableRipple="true" />} label="Edit others&#39; questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch defaultChecked={false} disableRipple="true" />} label="Download feedback files" />
          </div>
          <div>
            <FormControlLabel control={<Switch defaultUnChecked disableRipple="true" />} label="Manage admins (superadmin)" />
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
          <Link to="/manage-accounts" style={{ textDecoration: "none" }}>
            <Button variant="contained" disabled={!checkAllFields} onClick={setAccount}>Save & Return</Button>
          </Link>
          <div style={{ paddingTop: "70px" }}>
            <Link to="/manage-accounts" style={{ textDecoration: "none" }}>
              <Button color="grey" variant="contained">Cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
