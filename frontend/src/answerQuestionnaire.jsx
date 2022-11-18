import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Navbar from "./components/Navbar";
import TextAnswerInput from "./TextAnswerInput";
import {
  getQuestionnaire, getQuestion, createFeedback,
} from './service';

export default function AnswerQuestionnaire() {
  const { id } = useParams();
  const [questionList, setQuestionList] = React.useState([]);
  const [formTitle, setFormTitle] = React.useState("");

  React.useEffect(async () => {
    const res = await getQuestionnaire(id);
    setFormTitle(res.title);
    setQuestionList(res.questions);
    console.log(questionList);
  }, []);

  const handleChange = (e) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === e.target.id) {
        const newDict = { ...question };
        newDict.answer = e.target.value;
        Object.assign(question, newDict);
        console.log(question);
      }
    });
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const clickVideo = (e) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === e.target.value) {
        const newDict = { ...question };
        newDict.video_selected = true;
        Object.assign(question, newDict);
        console.log(question);
      }
    });
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const feedback = {};
    questionList.forEach((question) => {
      const newDict = {};
      newDict.content_type = "TEXT";
      newDict.content = question.answer;
      feedback[question.id] = newDict;
    });
    console.log(feedback);
    const res = await createFeedback(id, feedback);
    console.log(res);
    navigate('/submitted');
  };

  return (
    <div className="admin-create">
      <Navbar />
      <div className="admin-create-body">
        <div>
          {questionList.map((question) => (
            <TextAnswerInput
              key={question.id}
              id={question.id}
              question={question.content}
              onChange={handleChange}
              allowRecording={question.allow_recording}
              clickVideo={clickVideo}
              videoSelected={question.video_selected}
            />
          ))}
        </div>
        <div style={{ textAlign: "center" }} className="save-and-return">
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
