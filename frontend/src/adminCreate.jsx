import React from "react";
import { Link } from "react-router-dom";
import ElementSelector from "./components/ElementSelector";
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import "./styles/App.css";

export default function AdminCreate() {
  // const [isToggled, setIsToggled] = React.useState(false);
  const [questionList, setQuestionList] = React.useState([]);
  // const [questionCount, setQuestionCount] = React.useState(0);

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <input placeholder="Form name" />
      </div>
      <div style={{ textAlign: "center" }}>
        <button onClick={() => {
          const newQuestionList = [...questionList];
          newQuestionList.push({ question: "" });
          setQuestionList(newQuestionList);
          console.log(questionList);
        }}
        >
          Add form element +
        </button>
        <div>
          {questionList.map((question) => <TextInput />)}
        </div>
        {/* {isToggled && <ElementSelector />} */}

        <div style={{ textAlign: "center" }}>
          <button>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Save & Return
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
