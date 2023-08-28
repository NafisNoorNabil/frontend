import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/EmployerOrUser.css";

function EmployerUser() {
  return (
    <div className="App">
      <header className="SApp-header">
        <h1>Signup</h1>
        <div className="button-container">
        <Link to="/signup"><button className="login-button">Job Seeker</button></Link>
        <Link to="/employsignup"><button className="login-button">Employer</button></Link>
        </div>
            <div className='pics'>
                <img src="image1.jpg" alt="Slide 1" />
                <img src="image2.jpg" alt="Slide 2" />
                <img src="image3.jpg" alt="Slide 3" />
            </div>
            {/* Add more slides as needed */}
      </header>
    </div>
  );
}

export default EmployerUser;
