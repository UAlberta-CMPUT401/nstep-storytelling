import axios from 'axios';
import 'regenerator-runtime';

const api = 'http://localhost:8000/api';

const createQuestion = async (title) => {
  const question = await axios.post(`${api}/question/`);
  return question.data;
};

export {
  createQuestion,
};
