/* eslint-disable quotes */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./welcome";
import Login from "./login";
import Dashboard from "./dashboard";
import AdminCreate from "./adminCreate";
import UserCreate from "./userCreate";
import Submitted from "./submitted";
import WebcamComp from "./Webcam";
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
      <Route path="/Webcamtest" element={<WebcamComp />} />
    </Routes>
  );
}
