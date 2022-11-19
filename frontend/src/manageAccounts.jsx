/* eslint-disable no-plusplus */
/* eslint-disable no-constant-condition */
/* eslint-disable no-self-compare */
/* renderer reference: https://stackoverflow.com/a/70809777 */
/* conditional rendering ref: https://www.pluralsight.com/guides/how-to-show-components-conditionally-react */
import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AdminNavbar from "./components/AdminNavbar";
import "./styles/App.css";
import AdminItem from "./components/AdminItem";
import { getUser, getUsers } from "./service";

export default function ManageAccounts() {
  const [accountList, setAccountList] = React.useState([]);
  const userID = localStorage.getItem("userID");
  const [isSuperuser, setIsSuperuser] = React.useState(false);

  // preparing the list of accounts
  React.useEffect(async () => {
    const res = await getUsers();
    const tempList = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].id !== userID) { // don't show superadmin itself
        tempList.push(res[i]);
      }
    }
    setAccountList(tempList);
  }, []);

  // check if superadmin
  React.useEffect(async () => {
    const res = await getUser(userID);
    if (res.is_superuser) {
      setIsSuperuser(true);
    }
  }, []);

  // main render
  if (isSuperuser) {
    return (
      <div>
        <AdminNavbar />
        <div style={{ textAlign: "center", marginTop: "50px" }}>
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
        </div>
        <Link to="/create-account">
          <Button variant="contained" style={{ float: "right", marginRight: "400px", marginTop: "400px" }}>
            Add an admin
          </Button>
        </Link>
      </div>
    );
  }
  return (<h1>You do not have access to this page.</h1>);
}
