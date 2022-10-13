import React from 'react';
import { Tabs, Tab } from '@mui/material';
import Navbar from './Navbar';
import Forms from './forms';
import Feedback from './feedback';
import './styles/App.css';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Navbar />
      <Tabs value={selectedTab} onChange={handleChange} centered>
        <Tab label="Forms" />
        <Tab label="Feedback" />
      </Tabs>
      {selectedTab === 0 && <Forms />}
      {selectedTab === 1 && <Feedback />}
    </div>
  );
}