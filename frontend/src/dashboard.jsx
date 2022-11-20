import React from "react";
import { Tabs, Tab } from "@mui/material";
import Forms from "./forms";
import Feedback from "./feedback";
import Auditlog from "./auditlog";
import './styles/Dashboard.css';
import AdminNavbar from "./components/AdminNavbar";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="dashboard">
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="Forms" />
          <Tab label="Feedback" />
          <Tab label="Auditlog" />
        </Tabs>
        {selectedTab === 0 && <Forms />}
        {selectedTab === 1 && <Feedback />}
        {selectedTab === 2 && <Auditlog />}
      </div>
    </div>
  );
}
