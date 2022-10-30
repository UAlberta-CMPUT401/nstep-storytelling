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
const patchQuestion = async (questionnaireId, questionId, content) => {
  const question = await axios.patch(`${api}/questionnaire/${questionnaireId}/question/${questionId}/`, {
    content,
  });
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

export {
  createQuestion, deleteQuestion, createQuestionnaire, patchQuestionnaire, patchQuestion,
};
