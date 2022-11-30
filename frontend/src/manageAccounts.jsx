/* eslint-disable no-constant-condition */
/* eslint-disable no-self-compare */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import AdminNavbar from "./components/AdminNavbar";
import "./styles/App.css";
import AdminItem from "./components/AdminItem";
import { getUsers } from "./service";

export default function ManageAccounts() {
  const [accountList, setAccountList] = React.useState([]);
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  // preparing the list of accounts
  React.useEffect(async () => {
    const res = await getUsers();
    const tempList = [];
    for (let i = 0; i < res.length; i += 1) {
      if (res[i].id !== userID) { // don't show superadmin itself
        tempList.push(res[i]);
      }
    }
    setAccountList(tempList);
  }, []);

  // main render
  return (
    <div>
      <AdminNavbar />
      <div
        className="manage-accounts-body"
        style={{
          textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        }}
      >
        <h1>Manage administrators</h1>
        <div style={{ fontSize: "25px", paddingTop: "60px" }}>
          {accountList.map((account) => (
            <AdminItem
              key={account.id}
              id={account.id}
              title={account.username}
            />
          ))}
        </div>
        <Button
          style={{
            backgroundColor: '#FDCA00',
            color: '#414143',
            fontWeight: 'bold',
            margin: '100px',
          }}
          variant="contained"
          onClick={() => navigate('/create-account')}
        >
          Add an admin
        </Button>
      </div>
    </div>
  );
}
