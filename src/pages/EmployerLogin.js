import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/employ/login', {
        email,
        password,
      });

      console.log(response.data); // You can handle success accordingly
      navigate('/EmployerJobs'); // Navigate to the root route after successful login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="employ-container">
          <div className="login">
      <h2>Login</h2>
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
      <Link to="/EmployerJobs"><button onClick={handleLogin}>Login</button></Link>
    </div>
    </div>

  );
}

export default Login;
