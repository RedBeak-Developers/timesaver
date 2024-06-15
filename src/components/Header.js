import React from 'react';
import './Header.css';
import logo from '../assets/images/TimeSaverLogo.png';
import settings from '../assets/images/settings.png';

function Header(){
  function openWebsite(){
    
  }
  
  return (
    <div className="header-container">
      <button onClick={openWebsite} className="open-website-button">
        <img src={logo} alt="TimeSaver Logo" className="header-image-left" />
      </button>
      <h1 className="header-title">Time Saver</h1>
      <button onClick={openWebsite} className="open-website-button">
        <img src={settings} alt="Settings Icon" className="header-image-right" />
      </button>
    </div>
  );
}

export default Header;