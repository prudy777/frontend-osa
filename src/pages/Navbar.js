import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from "../assets/company.png";

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 800);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    const isMobileView = window.innerWidth < 800;
    setIsMobile(isMobileView);
    if (!isMobileView) {
      setCollapsed(false);
    } else {
      setCollapsed(true); // Collapse by default if mobile view
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set the initial state for collapsed based on window width on component mount
  useEffect(() => {
    setCollapsed(window.innerWidth < 800);
  }, []);

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="logo">
          <Link to="/">
            <img src={Logo} style={{ height: '60px', width: 'auto' }} alt="Company Logo" />
          </Link>
        </div>
        {isMobile ? (
          <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
            <i className="bx bx-menu"></i>
          </button>
        ) : null}
        <div className={`nav-links ${isMobile && collapsed ? 'show' : ''}`}>
          <ul className="links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/barcode">Barcode Generator</Link></li>
            <li>
              <a href="#">More</a>
              <i className="bx bxs-chevron-down arrow"></i>
              <ul className="sub-menu">
                <li><a href="#">Option 1</a></li>
                <li><a href="#">Option 2</a></li>
                <li><a href="#">Option 3</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`search-box ${isMobile && !collapsed ? 'hidden' : ''}`}>
          <i className="bx bx-search"></i>
          <div className="input-box">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
