import { accordionDetailsClasses } from '@mui/material';
import axios from 'axios';
import 'regenerator-runtime';

const api = 'http://localhost:8000/api';

const createQuestion = async (questionnaireId, content) => {
  const question = await axios.post(`${api}/questionnaire/${questionnaireId}/question/`, {
    content,
  });
  return question.data;
};
const deleteQuestion = async (questionnaireId, questionId) => {
  const res = await axios.delete(`${api}/questionnaire/${questionnaireId}/question/${questionId}/`);
  return res.data;
};
const patchQuestion = async (questionnaireId, questionId, content, allowRecording) => {
  const question = await axios.patch(`${api}/questionnaire/${questionnaireId}/question/${questionId}/`, {
    content: content,
    allow_recording: allowRecording,
  });
  return question.data;
};
const getQuestion = async (questionnaireId, questionId) => {
  const question = await axios.get(`${api}/questionnaire/${questionnaireId}/question/${questionId}/`);
  return question.data;
};
const createQuestionnaire = async (title, description) => {
  const questionnaire = await axios.post(`${api}/questionnaire/`, {
    title,
    description,
  });
  return questionnaire.data;
};
const patchQuestionnaire = async (questionnaireId, title) => {
  const questionnaire = await axios.patch(`${api}/questionnaire/${questionnaireId}/`, {
    title,
  });
  return questionnaire.data;
};
const getQuestionnaires = async () => {
  const questionnaires = await axios.get(`${api}/questionnaire/`);
  return questionnaires.data;
};
const deleteQuestionnaire = async (questionnaireId) => {
  const res = await axios.delete(`${api}/questionnaire/${questionnaireId}/`);
  return res.data;
};
const getQuestionnaire = async (questionnaireId) => {
  const questionnaire = await axios.get(`${api}/questionnaire/${questionnaireId}/`);
  return questionnaire.data;
};
const createFeedback = async (questionnaireId, answers) => {
  const feedback = await axios.post(`${api}/questionnaire/${questionnaireId}/feedback/`, answers);
  return feedback.data;
};
const getAuditLogs = async () => {
  const auditLogs = await axios.get(`${api}/auditlog/`);
  return auditLogs.data;
};

const createUser = async (username, password, email) => {
  const user = await axios.post(`${api}/user/`, {
    username,
    password,
    email,
  });
  return user.data;
};

const getUsers = async () => {
  const users = await axios.get(`${api}/user/`);
  return users.data;
};

export {
  createQuestion, deleteQuestion, createQuestionnaire,
  patchQuestionnaire, patchQuestion, getQuestionnaires,
  deleteQuestionnaire, getQuestionnaire, getQuestion,
  createUser, createFeedback, getUsers, getAuditLogs,
};
