import React from 'react';
import { Link } from "react-router-dom";
import pencil from "../../assets/pencil.png";

export default function AdminItem(props) {
  return (
    <div>
      {props.title}
      <Link to={`/edit-admin/${props.id}`}>
        <img className="NSTEPbutton" alt="pencil" src={pencil} />
      </Link>
    </div>
  );
}
