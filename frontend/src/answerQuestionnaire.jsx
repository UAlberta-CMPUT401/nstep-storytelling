import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
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

  const saveAudio = (qid, audioFile) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === qid) {
        const newDict = { ...question };
        newDict.content_audio = audioFile;
        Object.assign(question, newDict);
        console.log(question);
      }
    });
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const saveVideo = (qid, videoFile) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === qid) {
        const newDict = { ...question };
        newDict.content_video = videoFile;
        Object.assign(question, newDict);
        console.log(question);
      }
    });
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const clearRecordings = (qid) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === qid) {
        const newDict = { ...question };
        newDict.content_video = null;
        newDict.content_audio = null;
        Object.assign(question, newDict);
        console.log(question);
      }
    });
    setQuestionList(newQuestionList);
    console.log(questionList);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    let empty = false;
    questionList.forEach((question) => {
      if (!question.answer && !question.content_audio && !question.content_video) {
        empty = true;
      }
    });
    if (empty) {
      return;
    }
    const feedback = {};
    questionList.forEach((question) => {
      const newDict = {};
      newDict.content_type = "TEXT";
      newDict.content = question.answer;
      newDict.content_audio = question.content_audio;
      newDict.content_video = question.content_video;
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
      <div className="admin-create-body-wrapper">
        <div className="admin-create-body">
          <div>
            {questionList.map((question) => (
              <TextAnswerInput
                key={question.id}
                id={question.id}
                question={question.content}
                onChange={handleChange}
                allowRecording={question.allow_recording}
                saveAudio={saveAudio}
                saveVideo={saveVideo}
                clearRecordings={clearRecordings}
              />
            ))}
          </div>
          <div style={{ textAlign: "center" }} className="save-and-return">
            <Button
              style={{
                borderRadius: 25,
                backgroundColor: '#FDCA00',
                color: '#414143',
                fontWeight: 'bold',
              }}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
