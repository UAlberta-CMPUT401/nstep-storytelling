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
const createQuestionnaire = async (title, description) => {
  const questionnaire = await axios.post(`${api}/questionnaire/`, {
    title,
    description,
  });
  return questionnaire.data;
};

export {
  createQuestion, deleteQuestion, createQuestionnaire,
};
