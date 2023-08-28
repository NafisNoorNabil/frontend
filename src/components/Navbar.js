import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthcontext';
import { FaUserCircle } from 'react-icons/fa';




const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isEmployer = window.location.pathname === '/EmployerJobs';
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false); // Reset the dropdown state
    logout();
  };
  

  return (
    <nav className='allnav'>
      <ul>
        <img src="logo.png" alt="logo" className="navimage"></img>
        <p>JOBSPHERE</p>

        {!isEmployer && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}

        {user && (
          <li>
            <Link to="/jobpage">Jobs</Link>
          </li>
        )}

        {isEmployer && (
          <li>
            <Link to="/EmployerJobs">Job Listings</Link>
          </li>
        )}

        {isEmployer && (
          <li>
            <Link to="/form">Form</Link>
          </li>
        )}


        {isEmployer && (
          <li>
            <Link to="/JobApplications">Job Applications</Link>
          </li>
        )}

        <li>
          {user ? (
            <div className="profile-dropdown">
              <button className="dropdown-button" onClick={handleDropdownClick}>
                <span>{user.username}</span> <FaUserCircle className="usercircle" />
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          ) : !isEmployer && ( // Check if user is not an employer
            <div className='logsign'>
              <Link to="/EmployerOrUserLogin">Login</Link>|
              <Link to="/EmployerOrUserSign">Signup</Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
