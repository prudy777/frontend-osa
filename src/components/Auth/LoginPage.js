import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Logo from '../../assets/company.png';
import Logo3 from '../../assets/Home.jpeg';
import Logo4 from '../../assets/Osamedic3.jpeg';

const allowedEmail = 'prudy777@gmail.com';
const allowedPassword = 'progees';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [currentBackground, setCurrentBackground] = useState(0);
  const [nextBackground, setNextBackground] = useState(1);
  const [isSliding, setIsSliding] = useState(false);

  const backgroundImages = [
    `linear-gradient(to right, #ff416c, #ff4b2b)`, // Initial gradient
    `url(https://media.istockphoto.com/id/1188678645/photo/heart-and-stethoscope.webp?b=1&s=612x612&w=0&k=20&c=UwWLd3ENMqv7_S7EV5qaVtxhp9capaYbSDN85stpdvo=)`,
    `url(${Logo3})`,
    `url(${Logo4})`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);

      setTimeout(() => {
        setCurrentBackground(nextBackground);
        setNextBackground((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setIsSliding(false);
      }, 500); // Duration of the slide animation (0.5s)
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [nextBackground]);

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
      <div
        className={`login-image ${isSliding ? 'slide-out' : ''}`}
        style={{ backgroundImage: backgroundImages[currentBackground] }}
      >
        {/* Ensure this content is always visible on top of the background images */}
        <img src={Logo} alt="Logo" />
        <h2>WELCOME TO OSAMEDIC</h2>
        <p>We are more than just a company. We Provide Evolutional Services and Accurate Tests</p>
      </div>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
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
