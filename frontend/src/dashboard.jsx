import React from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import Navbar from "./components/Navbar";
import Forms from "./forms";
import Feedback from "./feedback";
import './styles/Dashboard.css';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div>
          <Link to="/">
            <button style={{
              float: "right", marginRight: "12px", marginBottom: "12px", fontSize: "16px",
            }}
            >
              Logout
            </button>
          </Link>
        </div>
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="Forms" />
          <Tab label="Feedback" />
        </Tabs>
        {selectedTab === 0 && <Forms />}
        {selectedTab === 1 && <Feedback />}
      </div>
    </div>
  );
}
