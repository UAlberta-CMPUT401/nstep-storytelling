/* eslint-disable no-constant-condition */
/* eslint-disable no-self-compare */
/* renderer reference: https://stackoverflow.com/a/70809777 */
/* conditional rendering ref: https://www.pluralsight.com/guides/how-to-show-components-conditionally-react */
import React from "react";
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import AdminNavbar from "./components/AdminNavbar";
import "./styles/App.css";
import { getUser } from "./service";

export default function DeleteAccount() {
  const [state, setState] = React.useState(false);
  const userID = localStorage.getItem("userID");
  const [isSuperuser, setIsSuperuser] = React.useState(false);

  const handleChange = () => {
    setState(!state);
  };
  const enableDelete = () => {
    return (
      <Link to="/manage-accounts">
        <Button variant="contained">
          Delete
        </Button>
      </Link>
      // TODO: delete in backend
      // have short-duration message shown on new page to confirm deleted
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

  if (isSuperuser) {
    return (
      <div>
        <AdminNavbar />
        <div style={{ textAlign: "center", marginTop: "50px" }}>
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
            johndoe@nstep.ca
          </div>
          <Link to="/edit-admin">
            <Button variant="contained" style={{ marginTop: "50px" }}>
              <b>No, go back.</b>
            </Button>
          </Link>
          <div style={{ paddingTop: "250px" }}>
            <FormControlLabel control={<Checkbox disableRipple="true" onChange={handleChange} />} label="Yes, I'm sure." />
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
