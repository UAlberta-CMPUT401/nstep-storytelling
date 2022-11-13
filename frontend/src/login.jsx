import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const history = useNavigate();
const [username, setUsername] = useState("");
const [usernameError, setUsernameError] = useState(false);
const [usernameHelper, setUsernameHelper] = useState(null);

const [password, setPassword] = useState("");
const [passwordError, setPasswordError] = useState(false);
const [passwordHelper, setPasswordHelper] = useState(null);

const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
const [openFailureAlert, setOpenFailureAlert] = useState(false);

function handleSignup() {
  history.navigate("/signup");
}

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

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function handleLogin() {
  axios
    .post(`${BASE_URL}/login/`, {
      username,
      password,
    })
    .then((res) => {
      console.log(res.data);
      console.log(res.data.token);
      localStorage.setItem("jwtToken", res.data.token);
      localStorage.setItem("userID", res.data.id);

      // const imb = localStorage.getItem('jwtToken')
      // console.log(imb)
      handleClick(true);
      history.navigate("/main/");
    })
    .catch((e) => {
      handleClick(false);
      console.log(e);
    });
}

export default function Login() {
  return (
    <CssVarsProvider>
      <main>
        <ModeToggle />
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <TextField
            // html input attribute
            name="username"
            type="username"
            placeholder="username"
            // pass down to FormLabel as children
            label="username"
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="password"
          />
          <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
          {/* <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography> */}
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
