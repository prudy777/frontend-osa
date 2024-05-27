// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css'; // Import the global CSS
import './App.css';    // Import the App CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
