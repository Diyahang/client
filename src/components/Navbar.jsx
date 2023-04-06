import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <Link className="link" to="/">
          <h1 className="logo">👨‍🎓 Kercha </h1>
        </Link>
        <div className="links">
          <Link className="link" to="/?job=all">
            <h6>Find Jobs</h6>
          </Link>
          <Link className="link" to="/?company=review">
            <h6>Company Review</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Post Jobs
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
