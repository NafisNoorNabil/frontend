import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../styles/AdminLogin.css";


const AdminLogin = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // For demonstration purposes, hardcoding admin credentials
        const adminEmail = 'admin@example.com';
        const adminPassword = 'admin123';

        if (email === adminEmail && password === adminPassword) {
            setIsLoggedIn(true);
            navigate('/Admin'); // Navigate to '/admin' route
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="admin-login-container">
            {isLoggedIn ? (
                <div className="admin-welcome">
                    <h1>Welcome, Admin!</h1>
                    {/* Your admin dashboard content */}
                </div>
            ) : (
                <div className="admin-form">
                    <h1>Admin Login</h1>
                    <input
                        type="text"
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
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
};
export default AdminLogin;
