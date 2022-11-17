/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
// https://www.geeksforgeeks.org/how-to-validate-password-is-strong-or-not-in-reactjs/
// https://www.geeksforgeeks.org/how-to-validate-an-email-in-reactjs/
import React from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import validator from "validator";
import ElementSelector from "./components/ElementSelector";
import AdminNavbar from "./components/AdminNavbar";
import TextAnswerInput from "./TextAnswerInput";
import "./styles/App.css";
import { createUser } from "./service";

export default function CreateAccount() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [passwordsMatch, setPasswordsMatch] = React.useState(false);
  const [emailFilled, setEmailFilled] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordFilled, setPasswordFilled] = React.useState(false);
  const [passwordFilledError, setPasswordFilledError] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [emailFilledError, setEmailFilledError] = React.useState(false);
  const checkAllFields = emailValid && passwordValid && passwordsMatch;

  const validateEmail = (value) => {
    if (validator.isEmail(value)) {
      return true;
    }
    return false;
  };

  const handleEmail = (e) => {
    if (e.target.value === "") {
      setEmailFilled(false);
      setEmailFilledError("Please enter an email");
    } else {
      setEmail(e.target.value);
      setEmailFilled(true);
      if (validateEmail(e.target.value)) {
        setEmailValid(true);
        setEmailFilledError("");
      } else {
        setEmailValid(false);
        setEmailFilledError("Please enter a valid email address");
      }
    }
  };

  const setAccount = async () => {
    await createUser(email, password);
  };

  const validatePassword = (value) => {
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,
    })) {
      return true;
    }
    return false;
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);

    if (e.target.value === "") {
      setErrorText("Please confirm your password");
      setPasswordsMatch(false);
    } else if (e.target.value.match(password)) {
      setPasswordsMatch(true);
      setErrorText("Passwords match!");
    } else {
      setErrorText("Passwords do not match");
      setPasswordsMatch(false);
    }
  };

  const handlePassword = (e) => {
    if (e.target.value === "") {
      setPasswordFilled(false);
      setPasswordFilledError("Please enter a password");
    } else {
      setPassword(e.target.value);
      setErrorText("Passwords do not match");
      if (confirmPassword !== "") {
        if (e.target.value.match(confirmPassword)) {
          setPasswordsMatch(true);
          setErrorText("Passwords match!");
        } else {
          setPasswordsMatch(false);
        }
      } else {
        setErrorText("");
      }
      setPasswordFilledError("");
      setPasswordFilled(true);
      if (validatePassword(e.target.value)) {
        setPasswordValid(true);
      } else {
        setPasswordFilledError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
        setPasswordValid(false);
      }
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
            <TextField id="password" label="password" type="password" error={!passwordValid} helperText={passwordFilledError} onChange={handlePassword} />
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
