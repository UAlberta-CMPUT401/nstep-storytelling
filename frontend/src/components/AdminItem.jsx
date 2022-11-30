import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import pencil from "../../assets/pencil.png";

export default function AdminItem(props) {
  const navigate = useNavigate();

  return (
    <div>
      {props.title}
      <IconButton sx={{ marginLeft: "30px" }} onClick={() => navigate(`/edit-admin/${props.id}`)}>
        <EditIcon />
      </IconButton>
    </div>
  );
}
