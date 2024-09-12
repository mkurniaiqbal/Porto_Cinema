import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRedirectPath } from "../../store/path/Path";
import Modal from "../modal/Modal";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [path, setPath] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      if (path) {
        navigate(path);
      }
    }
  }, [path, username, navigate]);

  function checkLogin() {
    if (username === "iqbal") {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }

  function handleFavorite() {
    setPath("/favorite-list");
    dispatch(setRedirectPath("/favorite-list"));
    checkLogin();
  }

  function handleWatchList() {
    setPath("/watch-list");
    dispatch(setRedirectPath("/watch-list"));
    checkLogin();
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="bg-info">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <Link to="/" className="text-decoration-none">
            <h1
              className="text-uppercase text-white pt-2"
              style={{ letterSpacing: 10 }}
            >
              Cinema
            </h1>
          </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center text-capitalize pt-3">
          <div className="me-3 cursor-pointer" onClick={handleFavorite}>
            <p className="favorite">Favorite</p>
          </div>
          <div className="cursor-pointer" onClick={handleWatchList}>
            <p className="watch-list">Watchlist</p>
          </div>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {showModal && <Modal onClose={handleCloseModal} />}
    </div>
  );
}

export default Navbar;
