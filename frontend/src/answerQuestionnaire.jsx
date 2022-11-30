import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Navbar from "./components/Navbar";
import TextAnswerInput from "./TextAnswerInput";
import {
  getQuestionnaire, getQuestion, createFeedback,
} from './service';

export default function AnswerQuestionnaire() {
  const { id } = useParams();
  const [questionList, setQuestionList] = React.useState([]);
  const [formTitle, setFormTitle] = React.useState("");
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openFailureAlert, setOpenFailureAlert] = React.useState(false);

  React.useEffect(async () => {
    const res = await getQuestionnaire(id);
    setFormTitle(res.title);
    setQuestionList(res.questions);
  }, []);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
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

  const handleChange = (e) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === e.target.id) {
        const newDict = { ...question };
        newDict.answer = e.target.value;
        Object.assign(question, newDict);
      }
    });
    setQuestionList(newQuestionList);
  };

  const saveAudio = (qid, audioFile) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === qid) {
        const newDict = { ...question };
        newDict.content_audio = audioFile;
        Object.assign(question, newDict);
      }
    });
    setQuestionList(newQuestionList);
  };

  const saveVideo = (qid, videoFile) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === qid) {
        const newDict = { ...question };
        newDict.content_video = videoFile;
        Object.assign(question, newDict);
      }
    });
    setQuestionList(newQuestionList);
  };

  const clearRecordings = (qid) => {
    const newQuestionList = [...questionList];
    newQuestionList.forEach((question) => {
      if (question.id === qid) {
        const newDict = { ...question };
        newDict.content_video = null;
        newDict.content_audio = null;
        Object.assign(question, newDict);
      }
    });
    setQuestionList(newQuestionList);
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
      handleClick(false);
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
    const res = await createFeedback(id, feedback);
    handleClick(true);
    await timeout(1000);
    navigate('/');
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
          Submitted!
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
          Incomplete Response
        </Alert>
      </Snackbar>
    </div>
  );
}
