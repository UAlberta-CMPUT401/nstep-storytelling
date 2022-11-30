/* eslint-disable no-constant-condition */
/* eslint-disable no-self-compare */
/* renderer reference: https://stackoverflow.com/a/70809777 */
/* conditional rendering ref: https://www.pluralsight.com/guides/how-to-show-components-conditionally-react */
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import AdminNavbar from "./components/AdminNavbar";
import "./styles/App.css";
import { getUser, deleteUser } from "./service";

export default function DeleteAccount() {
  const [state, setState] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const userID = localStorage.getItem("userID");
  const [isSuperuser, setIsSuperuser] = React.useState(false);
  const navigate = useNavigate();

  const selectedUserId = useParams().id;

  const backendDelete = async () => {
    await deleteUser(selectedUserId);
    navigate('/manage-accounts');
  };

  const handleChange = () => {
    setState(!state);
  };
  const enableDelete = () => {
    return (
      <Button color="error" variant="contained" onClick={backendDelete}>
        Delete
      </Button>
      // TODO: have short-duration message shown on new page to confirm deleted
    );
  };
  const disableDelete = () => {
    return (
      <Button disabled variant="contained">
        Delete
      </Button>
    );
  };

  // check if superadmin
  React.useEffect(async () => {
    const res = await getUser(userID);
    if (res.is_superuser) {
      setIsSuperuser(true);
    }
  }, []);

  React.useEffect(async () => {
    const res = await getUser(selectedUserId);
    setEmail(res.email);
  }, []);

  if (isSuperuser) {
    return (
      <div>
        <AdminNavbar />
        <div
          className="delete-account-body"
          style={{
            textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          }}
        >
          <h2>
            Are you sure you
            <br />
            want to delete the
            <br />
            admin account
            <br />
            identified by:
            <br />
          </h2>
          <div style={{ fontSize: "25px", paddingTop: "60px" }}>
            {email}
          </div>
          <Button variant="contained" onClick={() => navigate(`/edit-admin/${selectedUserId}`)} style={{ marginTop: "100px" }}>
            <b>No, go back</b>
          </Button>
          <div style={{ marginTop: "100px" }}>
            <FormControlLabel control={<Checkbox disableRipple onChange={handleChange} />} label="Yes, I'm sure." />
          </div>
          <div>
            {(() => {
              if (state) {
                return enableDelete();
              }
              return disableDelete();
            })()}
          </div>
        </div>
      </div>
    );
  }
  return (<h1>You do not have access to this page.</h1>);
}
