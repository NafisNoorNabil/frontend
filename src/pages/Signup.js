import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // New state for Username
    const [phone, setPhone] = useState(''); // New state for Phone

    const { signup, error, isLoading } = useSignup();
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Pass email, password, username, and phone to the signup function
        await signup(email, password, username, phone);
    };

    return (
        <div className="page-container">
            <form className="login" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                
                <label>Email address:</label>
                <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                />
                
                <label>Password:</label>
                <div style={{ position: "relative" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <span
                        className="password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                    </span>
                </div>
                <label>Username:</label>
                <input 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username} 
                />
                
                <label>Phone:</label>
                <input 
                    type="text" 
                    onChange={(e) => setPhone(e.target.value)} 
                    value={phone} 
                />
                
                <p>Already have an account? <Link to="/login">Login</Link></p>         

                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Signup;
