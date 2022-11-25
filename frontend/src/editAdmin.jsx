/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-constant-condition */
/* eslint-disable no-self-compare */
/* renderer reference: https://stackoverflow.com/a/70809777 */
/* conditional rendering ref: https://www.pluralsight.com/guides/how-to-show-components-conditionally-react */
import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AdminNavbar from "./components/AdminNavbar";
import "./styles/App.css";
import { getUser, patchUser } from "./service";

export default function EditAdmin() {
  const permissions = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  const [email, setEmail] = React.useState("");
  const [isSuperuser, setIsSuperuser] = React.useState(false);
  const [hasCreatePermission, setHasCreatePermission] = React.useState(false);
  const [hasEditPermission, setHasEditPermission] = React.useState(false);
  const [hasDeletePermission, setHasDeletePermission] = React.useState(false);
  const [hasViewPermission, setHasViewPermission] = React.useState(false);

  // get info of user to which this page is dedicated
  const selectedUserId = useParams().id;

  React.useEffect(async () => {
    const res = await getUser(selectedUserId);
    setEmail(res.email);
    for (let i = 0; i < res.user_permissions.length; i++) {
      if (res.user_permissions[i] === 37) {
        setHasCreatePermission(true);
      } if (res.user_permissions[i] === 38) {
        setHasEditPermission(true);
      } if (res.user_permissions[i] === 39) {
        setHasDeletePermission(true);
      } if (res.user_permissions[i] === 40) {
        setHasViewPermission(true);
      } // in future: add export permission
    }
    if (res.is_superuser) {
      setIsSuperuser(true);
    }
  }, []);

  const handleSuper = () => {
    setIsSuperuser(!isSuperuser);
  };

  const handleCreate = () => {
    setHasCreatePermission(!hasCreatePermission);
  };

  const handleEdit = () => {
    setHasEditPermission(!hasEditPermission);
  };

  const handleDelete = () => {
    setHasDeletePermission(!hasDeletePermission);
  };

  const handleView = () => {
    setHasViewPermission(!hasViewPermission);
  };

  // specific codes are used to represent specific permissions.
  // see source code for "User permissions" field on django admin site for their translations
  const convertPermissions = () => {
    // if a user is a superadmin they will automatically get these permissions
    if (hasCreatePermission === false) {
      permissions.splice(permissions.indexOf(33), 1); // can no longer add question
      permissions.splice(permissions.indexOf(37), 1); // can no longer add questionnaire
    }
    if (hasEditPermission === false) {
      permissions.splice(permissions.indexOf(34), 1); // can no longer change question
      permissions.splice(permissions.indexOf(38), 1); // can no longer change questionnaire
    }
    if (hasDeletePermission === false) {
      permissions.splice(permissions.indexOf(31), 1); // can no longer delete answer
      permissions.splice(permissions.indexOf(35), 1); // can no longer delete question
      permissions.splice(permissions.indexOf(39), 1); // can no longer delete questionnaire
    }
    if (hasViewPermission === false) {
      permissions.splice(permissions.indexOf(32), 1); // can no longer view answer
      permissions.splice(permissions.indexOf(36), 1); // can no longer view question
      permissions.splice(permissions.indexOf(40), 1); // can no longer view questionnaire
    }
    console.log(permissions);
  };

  const updateAccount = async () => {
    convertPermissions();
    await patchUser(selectedUserId, email, isSuperuser, permissions); // username === email
  };

  return (
    <div>
      <AdminNavbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Account</h1>
        <div style={{ fontSize: "25px", paddingTop: "60px" }}>
          email: {email}
          <Button variant="contained" color="secondary" style={{ marginLeft: "30px" }}>
            edit
          </Button>
        </div>
        <div style={{ textAlign: "center", paddingTop: "60px" }}>
          <h1>
            Permissions
          </h1>
          <div style={{ fontSize: "15px", paddingBottom: "60px" }}>
            Only editable by you
          </div>
          <div>
            <FormControlLabel control={<Switch checked={isSuperuser} disableRipple onChange={handleSuper} />} label="Manage admins (superadmin)" />
          </div>
          <div>
            <FormControlLabel control={<Switch checked={hasViewPermission} disableRipple onChange={handleView} />} label="View questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch checked={hasCreatePermission} disableRipple onChange={handleCreate} />} label="Create questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch checked={hasEditPermission} disableRipple onChange={handleEdit} />} label="Edit questionnaires" />
          </div>
          <div>
            <FormControlLabel control={<Switch checked={hasDeletePermission} disableRipple onChange={handleDelete} />} label="Delete questionnaires" />
          </div>
          {/* <div>
            <FormControlLabel control={<Switch disabled defaultChecked={false} disableRipple onChange={handleExport} />} label="Export data" />
          </div> */}
        </div>
        <Link to="/manage-accounts">
          <Button variant="contained" style={{ marginTop: "50px" }} onClick={updateAccount}>
            Save & Return
          </Button>
        </Link>
        <div style={{ paddingTop: "180px" }}>
          <Link to={`/delete-account/${selectedUserId}`}>
            Delete this account
          </Link>
        </div>
      </div>
    </div>
  );
}
