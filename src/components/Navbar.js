import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="#">
            TastyTrails
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active fw-bolder fs-6"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fw-bolder fs-6"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="d-flex">
              {localStorage.getItem("authToken") ? (
                <div className="d-flex">
                  <Link to="/cart">
                    <div className="btn bg-white text-info m-1 fw-bold">
                      MyCart
                      <Badge pill bg="danger" className="mx-1">
                        {data.length}
                      </Badge>
                    </div>
                  </Link>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <div
                        className="btn bg-white text-success m-1 fw-bold"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </li>
                  </ul>
                </div>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="btn bg-white text-primary m-1 fw-bold"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn bg-white text-warning m-1 fw-bold"
                      to="/createuser"
                    >
                      SignUp
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
