// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Logo from '../../assets/company.png';

const allowedEmail = 'prudy777@gmail.com';
const allowedPassword = 'progees';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === allowedEmail && password === allowedPassword) {
      login({ email, password }, 'fakeToken'); // fakeToken can be replaced with actual token logic if needed
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={Logo} alt="Logo" />
        <h2>WELCOME TO OSAMEDIC</h2>
        <p>We are more than just a company. We Provide Evolutional Services and Accurate Tests</p>
      </div>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <div className="create-account">
          {/* Sign up link can be removed or disabled */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
