/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
import React from "react";
import { Tabs, Tab } from "@mui/material";
import Forms from "./forms";
import Feedback from "./feedback";
import './styles/Dashboard.css';
import AdminNavbar from "./components/AdminNavbar";
import { getUser } from "./service";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isSuperadmin, setIsSuperadmin] = React.useState(false);
  const [showTheThing, setShowTheThing] = React.useState(false);
  const userID = localStorage.getItem("userID");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  React.useEffect(async () => {
    const res = await getUser(userID);
    if (res.is_superuser === true) {
      setShowTheThing(true);
    }
  }, []);

  const renderTheThing = () => {
    if (showTheThing) {
      console.log("is superadmin");
      return (<h1>the thing</h1>);
    } else {
      console.log("not superadmin");
      return null;
    }
  };

  return (
    <div>
      <AdminNavbar />
      {console.log("localStorage result: " + localStorage.getItem("userID"))}
      {renderTheThing()}
      <div className="dashboard">
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
