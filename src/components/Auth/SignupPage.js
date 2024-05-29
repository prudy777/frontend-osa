import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import Company from '../../assets/company.png'

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/signup', { email, password });
            alert(response.data); // Use the server's response message
            navigate('/login');
        } catch (error) {
            alert(error.response ? error.response.data : 'Signup failed');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-image">
                <img src={Company} alt="Logo" />
                <h2>We are The Lotus Team</h2>
                <p>We are more than just a company. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="signup">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
