import React from "react";
import { Link } from "react-router-dom";
import ElementSelector from "./components/ElementSelector";
import Navbar from "./components/Navbar";
import "./styles/App.css";

export default function AdminCreate() {
  const [isToggled, setIsToggled] = React.useState(false);

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <input placeholder="Form name" />
      </div>
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setIsToggled(!isToggled)}>
          Add form element +
        </button>

        {isToggled && <ElementSelector />}

        <div style={{ textAlign: "center" }}>
          <button>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Save & Return
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
