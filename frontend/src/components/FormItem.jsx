import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AlertDialog from './logout';
import '../styles/FormItem.css';

export default function FormItem(props) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleClick = () => {
    setDeleteOpen(true);
  };

  const deleteClose = () => {
    setDeleteOpen(false);
  };

  const handleAgree = () => {
    setDeleteOpen(false);
    props.onClick(props.id);
  };

  return (
    <div className="form-item">
      <Link className="form-link" to={`/admin/questionnaire/${props.id}`}>{props.title}</Link>
      <Button
        className="delete-form-button"
        variant="text"
        color="error"
        value={props.id}
        onClick={handleClick}
      >
        X
      </Button>
      <AlertDialog open={deleteOpen} handleAgree={handleAgree} handleClose={deleteClose} message="Are you sure you want to delete this form and its associated feedback?" />
    </div>
  );
}
