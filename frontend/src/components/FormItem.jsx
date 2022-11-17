import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import '../styles/FormItem.css';

export default function FormItem(props) {
  return (
    <div className="form-item">
      <Link className="form-link" to={`/admin/questionnaire/${props.id}`}>{props.title}</Link>
      <Button
        className="delete-form-button"
        variant="text"
        color="error"
        value={props.id}
        onClick={props.onClick}
      >
        X
      </Button>
    </div>
  );
}
