/* eslint-disable quotes */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./welcome";
import Login from "./login";
import Dashboard from "./dashboard";
import CreateQuestionnaire from "./createQuestionnaire";
import AnswerQuestionnaire from "./answerQuestionnaire";
import CreateAccount from "./createAccount";
import Submitted from "./submitted";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import AccountSettings from "./accountSettings";
import ManageAccounts from "./manageAccounts";
import EditAdmin from "./editAdmin";
import DeleteAccount from "./deleteAccount";
import EditForm from "./EditForm";
import WebCamTest from "./Webcam";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/create" element={<CreateQuestionnaire />} />
      <Route path="/submitted" element={<Submitted />} />
      <Route path="/Webcamtest" element={<WebCamTest />} />
      <Route path="/account" element={<AccountSettings />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/manage-accounts" element={<ManageAccounts />} />
      <Route path="/admin/questionnaire/:id" element={<EditForm />} />
      <Route path="/questionnaire/:id" element={<AnswerQuestionnaire />} />
      <Route path="/edit-admin/:id" element={<EditAdmin />} />
      <Route path="/delete-account/:id" element={<DeleteAccount />} />
    </Routes>
  );
}
