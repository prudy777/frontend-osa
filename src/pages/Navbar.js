import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from "../assets/company.png";
const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
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

  useEffect(() => {
    setIsMobile(window.innerWidth < 800);
    setCollapsed(window.innerWidth < 800); // Ensure collapsed is true on initial load if mobile
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
        <div className={`nav-links ${isMobile && collapsed ? '' : 'show'}`}>
          <ul className="links">
            <li><Link to="/">Home</Link></li>
             <li> <Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/barcode">Barcode Generator</Link></li>
            <li>
              <Link to="#">More</Link>
              <i className="bx bxs-chevron-down arrow"></i>
              <ul className="sub-menu">
                <li>< Link to="/general">Option 1</Link></li>
                <li><Link to="/generals">Option 2</Link></li>
                <li><Link to="#">Option 3</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`search-box ${isMobile && collapsed ? 'hidden' : ''}`}>
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
