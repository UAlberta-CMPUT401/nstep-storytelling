import React from 'react';
import Button from '@mui/material/Button';
import './styles/Forms.css';
import { Link } from "react-router-dom";

export default function Forms() {
  // const createForm = async () => {
  //   const res = await createForm("What is your favorite color?", "N/A");
  //   const newQuestion = { name: "", id: res.id };
  //   const newQuestionList = [...questionList, newQuestion];
  //   console.log(newQuestion);
  //   setQuestionList(newQuestionList);
  //   console.log(questionList);
  // };

  return (
    <div className="forms">
      <Link to="/create" style={{ textDecoration: "none", color: "white" }}>
        <Button variant="contained">
          + Create Form
        </Button>
      </Link>
      <ul>
        <li>Program 1 survey</li>
        <li>Program 2 survey</li>
        <li>Program 3 survey</li>
      </ul>
    </div>
  );
}
