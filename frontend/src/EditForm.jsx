import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import ElementSelector from "./components/ElementSelector";
import AdminNavbar from "./components/AdminNavbar";
import TextInput from "./components/TextInput";
import {
  deleteQuestion, patchQuestionnaire, patchQuestion, getQuestionnaire, getQuestion, createQuestion,
} from './service';

export default function EditForm() {
  const { id } = useParams();
  const [questionList, setQuestionList] = React.useState([]);
  const [formTitle, setFormTitle] = React.useState("");

  React.useEffect(async () => {
    const res = await getQuestionnaire(id);
    setFormTitle(res.title);
    const newQuestionList = [...questionList];
    await Promise.all(res.questions.map(async (questionId) => {
      const q = await getQuestion(id, questionId);
      console.log(q);
      newQuestionList.push(q);
    }));
    setQuestionList(newQuestionList);
    console.log(questionList);
  }, []);

  const handleTitle = (e) => {
    setFormTitle(e.target.value);
    console.log(formTitle);
  };

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

  const navigate = useNavigate();
  const handleSave = async (e) => {
    const res = await patchQuestionnaire(id, formTitle);
    console.log(res);

    await Promise.all(questionList.map(async (question) => {
      const q = await patchQuestion(id, question.id, question.content);
      console.log(q);
    }));
    navigate('/home');
  };

  const addQuestion = async () => {
    const res = await createQuestion(id, "Question content");
    const newQuestion = { content: "", id: res.id };
    const newQuestionList = [...questionList, newQuestion];
    console.log(newQuestion);
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const removeQuestion = async (e) => {
    const res = await deleteQuestion(id, e.target.value);
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
      <AdminNavbar />
      <div className="admin-create-body">
        <div style={{ textAlign: "center" }}>
          <TextField id="filled-basic" label="Form title" variant="filled" value={formTitle} onChange={handleTitle} />
        </div>
        <div>
          {questionList.map((question) => (
            <TextInput
              key={question.id}
              id={question.id}
              value={question.content}
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
          <Button variant="contained" onClick={handleSave}>Save & Return</Button>
        </div>
      </div>
    </div>
  );
}