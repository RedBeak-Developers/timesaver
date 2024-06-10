import React from 'react';
import './Header.css';
import logo from '../assets/images/TimeSaverLogo.png';
import settings from '../assets/images/settings.png';

function Header(){
  function openWebsite(){
    let websiteURL = process.env.REACT_APP_WEBSITE_URL;
    websiteURL = "localhost:3000";
    console.log(websiteURL);
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ websiteURL });
    } 
    else {
      window.open(websiteURL, '_blank');
    }
    console.log("opened website");
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