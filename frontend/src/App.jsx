/* eslint-disable quotes */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./welcome";
import Login from "./login";
import Dashboard from "./dashboard";
import AdminCreate from "./createQuestionnaire";
import UserCreate from "./answerQuestionnaire";
import Submitted from "./submitted";
import "./styles/App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<AdminCreate />} />
      <Route path="/newForm" element={<UserCreate />} />
      <Route path="/submitted" element={<Submitted />} />
      <Route path="/createAdmin" element={<Submitted />} />
    </Routes>
  );
}
