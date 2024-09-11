import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(params) {
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
          <Link to="/favorite-list" className="text-decoration-none">
            <div className="me-3 ">
              <p className="favorite"> Favorite</p>
            </div>
          </Link>
          <Link to="/wacth-list" className="text-decoration-none">
            <div>
              <p className="watch-list">Watchlist</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
