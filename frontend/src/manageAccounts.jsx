/* eslint-disable no-constant-condition */
/* eslint-disable no-self-compare */
/* renderer reference: https://stackoverflow.com/a/70809777 */
/* conditional rendering ref: https://www.pluralsight.com/guides/how-to-show-components-conditionally-react */
import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AdminNavbar from "./components/AdminNavbar";
import "./styles/App.css";
import pencil from "../assets/pencil.png";
import AdminItem from "./components/AdminItem";
import { getUsers } from "./service";

export default function ManageAccounts() {
  const [accountList, setAccountList] = React.useState([]);

  React.useEffect(async () => {
    const res = await getUsers();
    console.log(res);
    setAccountList(res);
  }, []);

  const drawEditButton = () => {
    return (
      <Link to="/edit-admin">
        <img className="NSTEPbutton" alt="pencil" src={pencil} />
      </Link>
    );
  };
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
          {/* johndoe@nstep.ca
          {drawEditButton()}
          <div>
            jane.f@nstep.ca
            {drawEditButton()}
          </div>
          <div>
            frank.yim@nstep.ca
            {drawEditButton()}
          </div>
          <div>
            cooper-wyatt@nstep.ca
            {drawEditButton()}
          </div>
          <div>
            marissasantos@nstep.ca
            {drawEditButton()}
          </div> */}
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
