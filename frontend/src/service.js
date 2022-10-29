import axios from 'axios';
import 'regenerator-runtime';

const api = 'http://localhost:8000/api';

const createQuestion = async (name, description) => {
  const question = await axios.post(`${api}/questions/`, {
    name, description,
  });
  return question.data;
};

export {
  createQuestion,
};
