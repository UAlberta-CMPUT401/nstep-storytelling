/* eslint-disable brace-style */
/* eslint-disable keyword-spacing */
/* eslint-disable no-else-return */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
// import { CssVarsProvider, useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from './components/Navbar';

// import Alert from "@mui/material/Alert";

export default function Login() {
  const BASE_URL = "http://[2605:fd00:4:1001:f816:3eff:febc:abdc]/api";
  // const BASE_URL = 'http://localhost:8000/api';

  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelper, setUsernameHelper] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState(null);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openFailureAlert, setOpenFailureAlert] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(true);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const handleClick = (success) => {
    if (success) {
      setOpenSuccessAlert(true);
    } else {
      setOpenFailureAlert(true);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAlert(false);
    setOpenFailureAlert(false);
  };

  const handleUsernameBlur = () => {
    if (username === "") {
      setUsernameError(true);
      setUsernameHelper("Username is required");
    } else {
      setUsernameError(false);
      setUsernameHelper(null);
    }
  };

  const handlePasswordBlur = () => {
    if (password === "") {
      setPasswordError(true);
      setPasswordHelper("Password is required");
    } else {
      setPasswordError(false);
      setPasswordHelper(null);
    }
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handleLogin = () => {
    axios
      .post(`${BASE_URL}/login/`, {
        username,
        password,
      })
      .then(async (res) => {
        localStorage.setItem("jwtToken", res.data.token);
        localStorage.setItem("userID", res.data.id);
        handleClick(true);
        await timeout(1000);
        history("/home");
      })
      .catch((e) => {
        handleClick(false);
      });
  };

  function renderButton() {
    return (
      <Button
        style={{
          borderRadius: 25,
          backgroundColor: '#FDCA00',
          color: '#414143',
          fontWeight: 'bold',
          width: '100px',
          alignSelf: 'center',
        }}
        variant="contained"
        onClick={handleLogin}
      >
        Login
      </Button>
    );
  }

  function handleGoBack() {
    history("/home");
  }

  function handleLogout() {
    localStorage.setItem("jwtToken", "null");
    localStorage.setItem("userID", "null");
    setDialogOpen(false);
    setLogoutSuccess(true);
  }

  function checkIfLoggedIn() {
    if (localStorage.getItem("jwtToken") !== "null" && openSuccessAlert === false && openFailureAlert === false) {
      return (
        <div>
          <Dialog
            open={dialogOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Already logged in
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you want to log out?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogout}>
                Yes
              </Button>
              <Button onClick={handleGoBack}>
                No, continue
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    return null;
  }

  return (
  // <CssVarsProvider>
    <main>
      <Navbar />
      {checkIfLoggedIn()}
      <Box
        className="login-box"
        sx={{
          mx: 'auto', // margin left & right
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#FAF9F6',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <Box sx={{ mb: 0 }}>
          <Typography
            color="textPrimary"
            variant="h6"
            align="center"
            fontWeight="bold"
          >
            Admin Login
          </Typography>
          <br />
        </Box>
        <TextField
          id="username"
          fullWidth
          label="Username"
          variant="outlined"
          style={{
            width: 300,
            alignSelf: 'center',
          }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              handleLogin();
            }
          }}
          error={usernameError}
          helperText={usernameHelper}
          onBlur={(e) => handleUsernameBlur()}
        />

        <TextField
          id="password"
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          style={{
            width: 300,
            alignSelf: 'center',
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              handleLogin();
            }
          }}
          error={passwordError}
          helperText={passwordHelper}
          onBlur={(e) => handlePasswordBlur()}
        />
        {renderButton()}
        <Snackbar
          open={openSuccessAlert}
          autoHideDuration={1500}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successful Login!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openFailureAlert}
          autoHideDuration={1500}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            Invalid Credentials
          </Alert>
        </Snackbar>
        {/* <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography> */}
      </Box>
    </main>
  // </CssVarsProvider>
  );
}
