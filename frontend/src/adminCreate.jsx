import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import ElementSelector from "./components/ElementSelector";
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import { createQuestion } from './service';
import "./styles/adminCreate.css";

export default function AdminCreate() {
  // const [isToggled, setIsToggled] = React.useState(false);
  const [questionList, setQuestionList] = React.useState([]);
  // const [questionCount, setQuestionCount] = React.useState(0);

  return (
    <div className="admin-create">
      <Navbar />
      <div className="admin-create-body">
        <div style={{ textAlign: "center" }}>
          <TextField id="filled-basic" label="Form title" variant="filled" />
        </div>
        <div>
          {questionList.map((question) => <TextInput />)}
        </div>
        {/* {isToggled && <ElementSelector />} */}
        <div className="add-element">
          <Button
            variant="text"
            onClick={() => {
              const res = createQuestion("hi", "hi");
              const newQuestionList = [...questionList];
              newQuestionList.push(res.data);
              setQuestionList(newQuestionList);
              console.log(questionList);
            }}
          >
            + Add form element
          </Button>
        </div>
        <div style={{ textAlign: "center" }} className="save-and-return">
          <a href="/dashboard" className="admin-save-button">
            <Button variant="contained">Save & Return</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
