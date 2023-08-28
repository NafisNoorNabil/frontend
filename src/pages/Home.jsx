import React from "react";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthcontext'; // Import the useAuthContext hook
import "../styles/Homestyle.css";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className="img-container">
      <h1 className="header">Find Your Next Opportunity with JobSphere</h1>
      <h3 className="sub-header">Your Journey to Career Advancement Begins Here</h3>
      {/* Conditional rendering for the button */}
      {user ? (
        <Link to="/jobpage">
          <button className="search-button">
            Search for Jobs
            <span className="arrow-icon">&#8594;</span>
          </button>
        </Link>
      ) : (
        <Link to="/EmployerOrUserLogin">
          <button className="search-button">
            Search for Jobs
            <span className="arrow-icon">&#8594;</span>
          </button>
        </Link>
      )}
      <div className="getstarted">
        <div className="imagepart">
          <img src="job2.jpg" alt="" />
        </div>
        <div>
          <p>Advance your career with JobSphere. Create a free account, complete your profile, and get matched with your dream job. </p>
          <Link to="/EmployerOrUserSign"><button>Get started</button></Link>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
