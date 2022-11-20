import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import ElementSelector from "./components/ElementSelector";
import AdminNavbar from "./components/AdminNavbar";
import DisplayAnswerElement from "./DisplayAnswerElement";
import {
  deleteQuestion, patchQuestionnaire, patchQuestion,
  getQuestionnaire, getQuestion, createQuestion, getFeedback,
} from './service';

export default function ViewAnswer() {
  const { id } = useParams();
  const [questionList, setQuestionList] = React.useState([]);
  const [answerList, setAnswerList] = React.useState([]);
  const [formTitle, setFormTitle] = React.useState("");

  React.useEffect(async () => {
    const res = await getFeedback(id);
    console.log(res);
    setFormTitle(res.questionnaire.title);
    setAnswerList(res.answers);
    // const newAnswerList = [...res.answers];
    // await Promise.all(newAnswerList.map(async (answer) => {
    //     const q = await getQuestion(res.questionnaire.id, answer.question);
    //     const newDict = { ...answer };
    //     newDict.question_content = q.content;
    //     Object.assign(answer, newDict);
    //     console.log(answer);
    //   }));
    // setAnswerList(newAnswerList);
    const newQuestionList = [...res.questionnaire.questions];
    newQuestionList.forEach((question) => {
      res.answers.forEach((answer) => {
        if (answer.question === question.id) {
          const newDict = { ...question };
          newDict.answer_content = answer.content;
          newDict.content_type = answer.content_type;
          newDict.content_audio = answer.content_audio;
          newDict.content_video = answer.content_video;
          Object.assign(question, newDict);
          console.log(question);
        }
      });
    });
    console.log(newQuestionList);
    setQuestionList(newQuestionList);
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

  const handleToggle = (e) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === e.target.value) {
        const newDict = { ...question };
        newDict.allow_recording = e.target.checked;
        Object.assign(question, newDict);
        console.log(question);
      }
    });
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const navigate = useNavigate();
  const handleSave = (e) => {
    navigate('/home');
  };

  const addQuestion = async () => {
    const res = await createQuestion(id, "Question content");
    const newQuestion = { content: "", id: res.id, allow_recording: false };
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
          <TextField
            id="filled-basic"
            label="Form title"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            value={formTitle}
          />
        </div>
        <div>
          {questionList.map((question) => (
            <DisplayAnswerElement
              key={question.id}
              question={question.content}
              answer={question.answer_content}
              contentAudio={question.content_audio}
              contentVideo={question.content_video}
            />
          ))}
        </div>
        <div style={{ textAlign: "center" }} className="save-and-return">
          <Button variant="contained" onClick={handleSave}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}
