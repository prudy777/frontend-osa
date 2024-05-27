import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import acceptTestImg from '../assets/accept test.png';
import accountingImg from '../assets/Accounting.png';
import mastersImg from '../assets/masters.png';
import performTestImg from '../assets/perform test.png';
import printReportImg from '../assets/print report.png';
import settingsImg from '../assets/settings.png';
import testLibraryImg from '../assets/test library.png';
import utilitiesImg from '../assets/Utilities.png';

const HomePage = () => {
  // Get current date
  const currentDate = new Date();
  const dateString = `${currentDate.getDate()}/${currentDate.toLocaleString('default', { month: 'short' })}/${currentDate.getFullYear()}`;

  return (
    <div className="homepage-container">
      <header className="header">
        <h1>Osamedic Lab</h1>
        <span>VER. 8.8.6</span>
      </header>
      <div className="grid-container">
        <Link to='/patients' className="grid-item"><img src={acceptTestImg} alt="Accept Test" />Accept Test</Link>
        <Link to="/accepted-patients" className="grid-item"><img src={performTestImg} alt="Perform Test" />Perform Test</Link>
        <Link to="/test-booking" className="grid-item"><img src={printReportImg} alt="Print Report" />Print Report</Link>
        <Link to="/accounting/transactions" className="grid-item"><img src={accountingImg} alt="Accounting" />Accounting</Link>
        <Link to="/utilities" className="grid-item"><img src={utilitiesImg} alt="Utilities" />Utilities</Link>
        <Link to="/settings" className="grid-item"><img src={settingsImg} alt="Settings" />Settings</Link>
        <Link to="/masters" className="grid-item"><img src={mastersImg} alt="Masters" />Masters</Link>
        <Link to="/test-bookings" className="grid-item"><img src={testLibraryImg} alt="Test Library" />Test Library</Link>
      </div>
      <footer className="footer">
        <div className="footer-item">Today's Date: {dateString}</div>
        <div className="footer-item">Today's Booking Amount: 0.00</div>
        <div className="footer-item">Exit</div>
      </footer>
    </div>
  );
};

export default HomePage;
