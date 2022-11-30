import React from 'react';
import Button from '@mui/material/Button';
import './styles/Forms.css';
import { Link } from "react-router-dom";
import FormItem from './components/FormItem';
import { getQuestionnaires, deleteQuestionnaire } from './service';

export default function Forms() {
  // const createForm = async () => {
  //   const res = await createForm("What is your favorite color?", "N/A");
  //   const newQuestion = { name: "", id: res.id };
  //   const newQuestionList = [...questionList, newQuestion];
  //   console.log(newQuestion);
  //   setQuestionList(newQuestionList);
  //   console.log(questionList);
  // };
  const [formList, setFormList] = React.useState([]);

  React.useEffect(async () => {
    const res = await getQuestionnaires();
    setFormList(res);
  }, []);

  const removeQuestionnaire = async (id) => {
    const res = await deleteQuestionnaire(id);

    const newFormList = await getQuestionnaires();
    setFormList(newFormList);
  };

  return (
    <div className="forms">
      <Link to="/create" style={{ textDecoration: "none", color: "white" }}>
        <Button
          style={{
            backgroundColor: '#FDCA00',
            color: '#414143',
            fontWeight: 'bold',
          }}
          variant="contained"
        >
          + Create Form
        </Button>
      </Link>
      <div>
        {formList.map((form) => (
          <FormItem
            key={form.id}
            id={form.id}
            title={form.title}
            onClick={removeQuestionnaire}
          />
        ))}
      </div>
    </div>
  );
}
