/* eslint-disable camelcase */
import axios from 'axios';
import 'regenerator-runtime';

const api = 'http://localhost:8000/api';

const createQuestion = async (questionnaireId, content) => {
  const token = localStorage.getItem('jwtToken');
  const question = await axios.post(`${api}/questionnaire/${questionnaireId}/question/`, {
    content,
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return question.data;
};
const deleteQuestion = async (questionnaireId, questionId) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.delete(`${api}/questionnaire/${questionnaireId}/question/${questionId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};
const patchQuestion = async (questionnaireId, questionId, content, allowRecording) => {
  const token = localStorage.getItem('jwtToken');
  const question = await axios.patch(`${api}/questionnaire/${questionnaireId}/question/${questionId}/`, {
    content: content,
    allow_recording: allowRecording,
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return question.data;
};
const getQuestion = async (questionnaireId, questionId) => {
  const question = await axios.get(`${api}/questionnaire/${questionnaireId}/question/${questionId}/`);
  return question.data;
};
const createQuestionnaire = async (title, description) => {
  const token = localStorage.getItem('jwtToken');
  const questionnaire = await axios.post(`${api}/questionnaire/`, {
    title,
    description,
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return questionnaire.data;
};
const patchQuestionnaire = async (questionnaireId, title) => {
  const token = localStorage.getItem('jwtToken');
  const questionnaire = await axios.patch(`${api}/questionnaire/${questionnaireId}/`, {
    title,
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return questionnaire.data;
};
const getQuestionnaires = async () => {
  const questionnaires = await axios.get(`${api}/questionnaire/`);
  return questionnaires.data;
};
const deleteQuestionnaire = async (questionnaireId) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.delete(`${api}/questionnaire/${questionnaireId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
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
  const token = localStorage.getItem('jwtToken');
  const res = await axios.delete(`${api}/feedback/${feedbackId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};

const getFeedback = async (feedbackId) => {
  const token = localStorage.getItem('jwtToken');
  const feedback = await axios.get(`${api}/feedback/${feedbackId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return feedback.data;
};
const createUser = async (username, password, email, is_superuser, user_permissions) => {
  const token = localStorage.getItem('jwtToken');
  const user = await axios.post(`${api}/user/`, {
    username,
    password,
    email,
    is_superuser,
    user_permissions,
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return user.data;
};
const getUsers = async () => {
  const token = localStorage.getItem('jwtToken');
  const users = await axios.get(`${api}/user/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return users.data;
};

const getUser = async (userId) => {
  const token = localStorage.getItem('jwtToken');
  console.log(token);
  const user = await axios.get(`${api}/user/${userId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return user.data;
};

const deleteUser = async (userId) => {
  const token = localStorage.getItem('jwtToken');
  const res = await axios.delete(`${api}/user/${userId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};

const getAllFeedback = async () => {
  const token = localStorage.getItem('jwtToken');
  const feedback = await axios.get(`${api}/feedback/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return feedback.data;
};

export {
  createQuestion, deleteQuestion, createQuestionnaire,
  patchQuestionnaire, patchQuestion, getQuestionnaires,
  deleteQuestionnaire, getQuestionnaire, getQuestion,
  createUser, createFeedback, getUsers, getUser, deleteUser,
  getFeedback, getAllFeedback, deleteFeedback,
};
