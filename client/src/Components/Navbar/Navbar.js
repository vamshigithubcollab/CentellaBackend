import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbarcss">
      <Link className="navbar-brand" to="/">Sci-Com</Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto ">
          {isAuthenticated ? (
            <li className="nav-item d-flex">
              <Link className="nav-link" to="/"></Link>
              <button 
                className="btn btn-outline-success btn-sm"
                onClick={()=>{
                    localStorage.clear();
                    window.location.href="/login";
                }}
              >
                <span className="login-text">Logout</span>
                </button> 
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
