import React from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ElementSelector from "./components/ElementSelector";
import Navbar from "./components/Navbar";
import TextAnswerInput from "./TextAnswerInput";
import "./styles/App.css";

export default function CreateAdmins() {
  return (
    <>
      <Navbar />
      <TextField>email: </TextField>
      <TextAnswerInput question="What is your favorite color?" />
      <TextAnswerInput question="What are your thoughts on the political and economic state of the world right now?" />
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Link to="/submitted" style={{ textDecoration: "none" }}>
          <Button variant="contained">Submit</Button>
        </Link>
      </div>

    </>
  );
}
