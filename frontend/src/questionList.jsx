import React from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = ({ questionList }) => {
  return (
    questionList.map((question) => <QuestionItem title={question.title} />)
  );
};

export default QuestionList;
