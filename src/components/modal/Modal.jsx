// Modal.jsx
import React from "react";
import Logo_Login from "../../assets/logo-login.svg";
import "./Modal.css";
import { Link } from "react-router-dom";

function Modal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <Link to={"/login"}>
        <div className="modal-dialog">
          <img src={Logo_Login} alt="Logo" />
          <span className="text-secondary">Login</span>
        </div>
      </Link>
    </div>
  );
}

export default Modal;
