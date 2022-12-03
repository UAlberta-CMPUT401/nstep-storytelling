/* eslint-disable prefer-template */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
// https://www.geeksforgeeks.org/how-to-validate-password-is-strong-or-not-in-reactjs/
// https://www.geeksforgeeks.org/how-to-validate-an-email-in-reactjs/
import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { getUser, createUser } from "./service";

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
  const [isSuperadmin, setIsSuperadmin] = React.useState(false);
  const [canEditSurvey, setCanEditSurvey] = React.useState(false);
  const [canDeleteSurvey, setCanDeleteSurvey] = React.useState(false);
  const [canCreateSurvey, setCanCreateSurvey] = React.useState(false);
  const [canExportData, setCanExportData] = React.useState(false);
  const [canViewSurvey, setCanViewSurvey] = React.useState(false);
  const [wantForward, setWantForward] = React.useState(true);
  const checkAllFields = emailValid && passwordValid && passwordsMatch;
  const permissions = [];
  const permissionsVisual = [canCreateSurvey, canEditSurvey, canDeleteSurvey, canExportData, canViewSurvey];
  const userID = localStorage.getItem("userID");
  const [isSuperuser, setIsSuperuser] = React.useState(false);
  const navigate = useNavigate();

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

  // specific codes are used to represent specific permissions.
  // see source code for "User permissions" field on django admin site for their translations
  const convertPermissions = () => {
    // if a user is a superadmin they will automatically get these permissions
    if (canCreateSurvey) {
      permissions.push(33); // "can add question"
      permissions.push(37); // "can add questionnaire"
    }
    if (canEditSurvey) {
      permissions.push(34); // "can change question"
      permissions.push(38); // "can change questionnaire"
    }
    if (canDeleteSurvey) {
      permissions.push(31); // "can delete answer"
      permissions.push(35); // "can delete question"
      permissions.push(39); // "can delete questionnaire"
    }
    if (canViewSurvey) {
      permissions.push(32); // "can view answer"
      permissions.push(36); // "can view question"
      permissions.push(40); // "can view questionnaire"
    }
  };

  const setAccount = async () => {
    convertPermissions();
    await createUser(email, password, email, isSuperadmin, permissions); // username === email
    navigate('/manage-accounts');
  };

  const handleForward = () => {
    setWantForward(!wantForward);
  };

  const isManualSuperadmin = (canCreateSurvey === true && isSuperadmin === false && canViewSurvey === true && canEditSurvey === true && canDeleteSurvey === true);

  const checkManualSuperadmin = () => {
    if (isManualSuperadmin) {
      setIsSuperadmin(true);
    }
  };

  const handleCreate = () => {
    if (canCreateSurvey === false && isSuperadmin === false && canViewSurvey === true && canEditSurvey === true && canDeleteSurvey === true) {
      setIsSuperadmin(true);
    }
    checkManualSuperadmin(); // checks if user set the superadmin permissions manually
    setCanCreateSurvey(!canCreateSurvey);
    if (canCreateSurvey === true && isSuperadmin === true) {
      setIsSuperadmin(false);
    }
  };

  const handleEdit = () => {
    if (canEditSurvey === false && isSuperadmin === false && canCreateSurvey === true && canViewSurvey === true && canDeleteSurvey === true) {
      setIsSuperadmin(true);
    }
    checkManualSuperadmin(); // checks if user set the superadmin permissions manually
    setCanEditSurvey(!canEditSurvey);
    if (canEditSurvey === true && isSuperadmin === true) {
      setIsSuperadmin(false);
    }
  };

  const handleDelete = () => {
    if (canDeleteSurvey === false && isSuperadmin === false && canCreateSurvey === true && canEditSurvey === true && canViewSurvey === true) {
      setIsSuperadmin(true);
    }
    checkManualSuperadmin(); // checks if user set the superadmin permissions manually
    setCanDeleteSurvey(!canDeleteSurvey);
    if (canDeleteSurvey === true && isSuperadmin === true) {
      setIsSuperadmin(false);
    }
  };

  // const handleExport = () => {
  //   setCanExportData(!canExportData);
  // };

  const handleView = () => {
    if (canViewSurvey === false && isSuperadmin === false && canCreateSurvey === true && canEditSurvey === true && canDeleteSurvey === true) {
      setIsSuperadmin(true);
    }
    checkManualSuperadmin(); // checks if user set the superadmin permissions manually
    setCanViewSurvey(!canViewSurvey);
    if (canViewSurvey === true && isSuperadmin === true) {
      setIsSuperadmin(false);
    }
  };

  const handleSuper = () => {
    setIsSuperadmin(!isSuperadmin);
    if (isSuperadmin === true) {
      setCanCreateSurvey(false);
      setCanEditSurvey(false);
      setCanDeleteSurvey(false);
      setCanViewSurvey(false);
    } else if (isSuperadmin === false) {
      setCanCreateSurvey(true);
      setCanEditSurvey(true);
      setCanDeleteSurvey(true);
      setCanViewSurvey(true);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div
        style={{
          textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#FAF9F6",
        }}
        className="create-account-body"
      >
        <h1>Add an administrator account</h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          autoComplete="off"
        >
          <div>
            <TextField id="email" label="Email" type="email" error={!emailFilled} helperText={emailFilledError} onChange={handleEmail} />
          </div>
          <div>
            <TextField id="password" label="Password" type="password" error={!passwordValid} helperText={passwordFilledError} onChange={handlePassword} />
          </div>
          <div>
            <TextField id="confirm-password" label="Confirm password" error={!passwordsMatch} type="password" helperText={errorText} onChange={handleConfirmPassword} />
          </div>

        </Box>
        {/* <div style={{ textAlign: "center" }}>
          <FormControlLabel control={<Checkbox checked={wantForward} disableRipple={true} onChange={handleForward} />} label="Send me an email confirming this account creation" />
        </div>
        <div>A temporary random password will be sent to the new user via the email address you submit.</div> */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Permissions</h1>
          <div>
            <FormControlLabel control={<Switch checked={isSuperadmin} disableRipple={true} onChange={handleSuper} />} label="Manage admins (superadmin)" />
          </div>
          <div>
            <FormControlLabel control={<Switch checked={canViewSurvey} disableRipple={true} onChange={handleView} />} label="View questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch checked={canCreateSurvey} disableRipple={true} onChange={handleCreate} />} label="Create questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch checked={canEditSurvey} disableRipple={true} onChange={handleEdit} />} label="Edit questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch checked={canDeleteSurvey} disableRipple={true} onChange={handleDelete} />} label="Delete questionnaires" />
          </div>
          <div>
            {/* <FormControlLabel control={<Switch disableRipple={true} onChange={handleExport} />} label="Export data" /> */}
          </div>
          {/* <Button onClick={viewVariables}>console</Button> */}
        </div>
        <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
          <Button variant="contained" disabled={!checkAllFields} onClick={setAccount}>Save & Return</Button>
          <div style={{ paddingTop: "70px" }}>
            <Link to="/manage-accounts" style={{ textDecoration: "none" }}>
              <Button variant="text">Cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
