/* eslint-disable prefer-template */
/* eslint-disable react/jsx-boolean-value */
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
  const [viewOnly, setViewOnly] = React.useState(false);
  const [wantForward, setWantForward] = React.useState(true);
  const checkAllFields = emailValid && passwordValid && passwordsMatch;
  const permissions = [];
  const permissionsVisual = [canCreateSurvey, canEditSurvey, canDeleteSurvey, canExportData, viewOnly];
  const userID = localStorage.getItem("userID");
  const [isSuperuser, setIsSuperuser] = React.useState(false);

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

  // permissions = [canCreateSurvey, canEditSurvey, canDeleteSurvey, canExportData, viewOnly]
  // permissions = [37, 38, 39, ?, ?] <= permission codes

  const convertPermissions = () => {
    if (canCreateSurvey) {
      permissions.push(37);
    }
    if (canEditSurvey) {
      permissions.push(38);
    }
    if (canDeleteSurvey) {
      permissions.push(39);
    }
    console.log(permissionsVisual);
    console.log(permissions);
  };

  const setAccount = async () => {
    convertPermissions();
    await createUser(email, password, email, isSuperadmin); // username === email
  };

  const handleForward = () => {
    setWantForward(!wantForward);
  };

  const handleSuper = () => {
    setIsSuperadmin(!isSuperadmin);
  };

  const handleCreate = () => {
    setCanCreateSurvey(!canCreateSurvey);
  };

  const handleEdit = () => {
    setCanEditSurvey(!canEditSurvey);
  };

  const handleDelete = () => {
    setCanDeleteSurvey(!canDeleteSurvey);
  };

  const handleExport = () => {
    setCanExportData(!canExportData);
  };

  const handleView = () => {
    setViewOnly(!viewOnly);
  };

  const viewVariables = () => {
    convertPermissions();
    console.log("wantForward = " + wantForward);
  };

  // check if superadmin
  React.useEffect(async () => {
    const res = await getUser(userID);
    if (res.is_superuser) {
      setIsSuperuser(true);
    }
  }, []);

  if (isSuperuser) {
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
            <FormControlLabel control={<Checkbox defaultChecked disableRipple={true} onChange={handleForward} />} label="Send a copy of these credentials to you and this person&#39;s email" />
          </div>
          <div style={{ textAlign: "center" }}>
            <h1>Permissions</h1>
            <div>
              <FormControlLabel control={<Switch defaultChecked={false} disableRipple={true} onChange={handleSuper} />} label="Manage admins (superadmin)" />
            </div>
            <div>
              <FormControlLabel control={<Switch defaultChecked={false} disableRipple={true} onChange={handleCreate} />} label="Create questionnaires" />
            </div>
            <div>
              <FormControlLabel control={<Switch defaultChecked={false} disableRipple={true} onChange={handleEdit} />} label="Edit others&#39; questionnaires" />
            </div>
            <div>
              <FormControlLabel control={<Switch defaultChecked={false} disableRipple={true} onChange={handleDelete} />} label="Delete questionnaires" />
            </div>
            <div>
              <FormControlLabel control={<Switch defaultChecked={false} disableRipple={true} onChange={handleExport} />} label="Export data" />
            </div>
            <div>
              <FormControlLabel control={<Switch defaultChecked={false} disableRipple={true} onChange={handleView} />} label="View only" />
            </div>
            <Button onClick={viewVariables}>console</Button>
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
  return (<h1>You do not have access to this page.</h1>);
}
