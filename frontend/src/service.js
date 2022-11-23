/* eslint-disable camelcase */
import { accordionDetailsClasses } from '@mui/material';
import axios from 'axios';
import 'regenerator-runtime';

const api = 'http://localhost:8000/api';
const token = localStorage.getItem('jwtToken');
const id = localStorage.getItem('userID');

const header = {
  headers: {
    Authorization: `Token ${token}`,
  },
};

const createQuestion = async (questionnaireId, content) => {
  const question = await axios.post(`${api}/questionnaire/${questionnaireId}/question/`, {
    content,
  }, header);
  return question.data;
};
const deleteQuestion = async (questionnaireId, questionId) => {
  const res = await axios.delete(`${api}/questionnaire/${questionnaireId}/question/${questionId}/`, header);
  return res.data;
};
const patchQuestion = async (questionnaireId, questionId, content, allowRecording) => {
  const question = await axios.patch(`${api}/questionnaire/${questionnaireId}/question/${questionId}/`, {
    content: content,
    allow_recording: allowRecording,
  }, header);
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
  }, header);
  return questionnaire.data;
};
const patchQuestionnaire = async (questionnaireId, title) => {
  const questionnaire = await axios.patch(`${api}/questionnaire/${questionnaireId}/`, {
    title,
  }, header);
  return questionnaire.data;
};
const getQuestionnaires = async () => {
  const questionnaires = await axios.get(`${api}/questionnaire/`);
  return questionnaires.data;
};
const deleteQuestionnaire = async (questionnaireId) => {
  const res = await axios.delete(`${api}/questionnaire/${questionnaireId}/`, header);
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
const deleteFeedback = async (feedbackId) => {
  const res = await axios.delete(`${api}/feedback/${feedbackId}/`, header);
  return res.data;
};

const getFeedback = async (feedbackId) => {
  const feedback = await axios.get(`${api}/feedback/${feedbackId}/`, header);
  return feedback.data;
};
const createUser = async (username, password, email, is_superuser, user_permissions) => {
  const user = await axios.post(`${api}/user/`, {
    username,
    password,
    email,
    is_superuser,
    user_permissions,
  }, header);
  return user.data;
};
const getUsers = async () => {
  const users = await axios.get(`${api}/user/`, header);
  return users.data;
};

const getUser = async (userId) => {
  const user = await axios.get(`${api}/user/${userId}/`, header);
  return user.data;
};

const deleteUser = async (userId) => {
  const res = await axios.delete(`${api}/user/${userId}/`, header);
  return res.data;
};

const getAllFeedback = async () => {
  const feedback = await axios.get(`${api}/feedback/`, header);
  return feedback.data;
};

export {
  createQuestion, deleteQuestion, createQuestionnaire,
  patchQuestionnaire, patchQuestion, getQuestionnaires,
  deleteQuestionnaire, getQuestionnaire, getQuestion,
  createUser, createFeedback, getUsers, getUser, deleteUser,
  getFeedback, getAllFeedback, deleteFeedback,
};
