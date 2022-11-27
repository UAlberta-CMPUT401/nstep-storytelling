import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Navbar from "./components/Navbar";
import Selection from "./components/Selection";
import './styles/welcome.css';

export default function Welcome() {
  const handleFacebook = () => {
    window.location.href = 'https://www.facebook.com/teamNSTEP';
  };
  const handleTwitter = () => {
    window.location.href = 'https://twitter.com/NSTEPca';
  };
  const handleInstagram = () => {
    window.location.href = 'https://www.instagram.com/nstep_eatwalklive/';
  };
  const handleYoutube = () => {
    window.location.href = 'https://www.youtube.com/channel/UCKRhL4ISrWjN0KAEMPQix7g';
  };

  return (
    <div>
      <Navbar />
      <Selection />
      <div className="welcome-footer">
        <div>
          <Link to="/login" className="admin-login-link">
            Admin Login
          </Link>
        </div>
        <div>
          <IconButton onClick={handleFacebook} sx={{ margin: "2px" }}><FacebookIcon /></IconButton>
          <IconButton onClick={handleTwitter} sx={{ margin: "2px" }}><TwitterIcon /></IconButton>
          <IconButton onClick={handleInstagram} sx={{ margin: "2px" }}><InstagramIcon /></IconButton>
          <IconButton onClick={handleYoutube} sx={{ margin: "2px" }}><YouTubeIcon /></IconButton>
        </div>
      </div>
      <div className="legal">
        © 2022 All Rights Reserved
      </div>
    </div>
  );
}
