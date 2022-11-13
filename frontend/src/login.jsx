import * as React from 'react';
// import { CssVarsProvider, useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
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
  // const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
  const BASE_URL = 'http://localhost:8000/api';

  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelper, setUsernameHelper] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState(null);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openFailureAlert, setOpenFailureAlert] = useState(false);

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

  // function ModeToggle() {
  //   const { mode, setMode } = useColorScheme();
  //   const [mounted, setMounted] = React.useState(false);

  //   // necessary for server-side rendering
  //   // because mode is undefined on the server
  //   React.useEffect(() => {
  //     setMounted(true);
  //   }, []);
  //   if (!mounted) {
  //     return null;
  //   }

  //   return (
  //     <Button
  //       variant="outlined"
  //       onClick={() => {
  //         setMode(mode === 'light' ? 'dark' : 'light');
  //       }}
  //     >
  //       {mode === 'light' ? 'Turn dark' : 'Turn light'}
  //     </Button>
  //   );
  // }
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
        console.log(res.data);
        console.log(res.data.token);
        localStorage.setItem("jwtToken", res.data.token);
        localStorage.setItem("userID", res.data.id);
        console.log(localStorage.getItem('jwtToken'));
        console.log(localStorage.getItem('userID'));
        handleClick(true);
        await timeout(1000);
        history("/home/");
      })
      .catch((e) => {
        handleClick(false);
        console.log(e);
      });
  };

  return (
  // <CssVarsProvider>
    <main>
      <Navbar />
      {/* <ModeToggle /> */}
      <Box
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          justifyContent: 'center',
          minHeight: '600px',
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
            fontFamily="Arial"
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
        <Button onClick={handleLogin} variant="contained" sx={{ mt: 1, width: "30%", alignSelf: "center" }}>Log in</Button>

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
            Incorrect Credentials
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
