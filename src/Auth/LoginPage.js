import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './login.css';
import Logo  from '../assets/company.png'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', { email, password });
            login({ email }, response.data.token);
            navigate('/');
        } catch (error) {
            alert(error.response ? error.response.data : 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={Logo} alt="Logo" />
                <h2>We are The Lotus Team</h2>
                <p>We are more than just a company. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
                <div className="create-account">
                    Don't have an account? <Link to="/signup">CREATE NEW</Link> {/* Make it a clickable link */}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
