import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import ElementSelector from "./components/ElementSelector";
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import { createQuestion, deleteQuestion, createQuestionnaire } from './service';
import "./styles/adminCreate.css";

export default function AdminCreate() {
  // const [isToggled, setIsToggled] = React.useState(false);
  const [questionList, setQuestionList] = React.useState([]);
  const [qid, setQid] = React.useState("hi");

  React.useEffect(async () => {
    const res = await createQuestionnaire("Form title", "Form description");
    console.log(res);
    setQid(res.id);
    console.log(qid);
  }, []);

  const handleChange = (e) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === e.target.id) {
        const newDict = { ...question };
        newDict.content = e.target.value;
        Object.assign(question, newDict);
        console.log(question);
      }
    });
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const addQuestion = async () => {
    const res = await createQuestion(qid, "Question content");
    const newQuestion = { content: "", id: res.id };
    const newQuestionList = [...questionList, newQuestion];
    console.log(newQuestion);
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const removeQuestion = async (e) => {
    const res = await deleteQuestion(qid, e.target.value);
    console.log(res);

    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === e.target.value) {
        const index = newQuestionList.indexOf(question);
        if (index !== -1) {
          newQuestionList.splice(index, 1);
        }
      }
    });
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  return (
    <div className="admin-create">
      <Navbar />
      <div className="admin-create-body">
        <div style={{ textAlign: "center" }}>
          <TextField id="filled-basic" label="Form title" variant="filled" />
        </div>
        <div>
          {questionList.map((question) => (
            <TextInput
              key={question.id}
              id={question.id}
              value={question.name}
              onChange={handleChange}
              onClick={removeQuestion}
            />
          ))}
        </div>
        {/* {isToggled && <ElementSelector />} */}
        <div className="add-element">
          <Button
            variant="text"
            onClick={addQuestion}
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
