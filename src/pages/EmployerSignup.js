import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Signup() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/employ/signup', {
        companyName,
        email,
        password,
      });
      console.log(response.data); // You can handle success accordingly
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="employ-container">
    <div className="login">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/EmployerJobs"><button onClick={handleSignup}>Signup</button></Link>
    </div>
    </div>

  );
}

export default Signup;
