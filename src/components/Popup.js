import React from 'react';
import { useSelector } from 'react-redux';
import './Popup.css';
import Header from './Header.js';
import HomeTab from './HomeTab.js';
import FocusTab from './FocusTab.js';
import BlockTab from './BlockTab.js';
import TabButtons from './TabButtons.js';

function Popup() {
  const activeTab = useSelector((state) => state.tab.activeTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'focus':
        return <FocusTab />;
      case 'block':
        return <BlockTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="popup">
      <Header />
      <div className="tab-content">
        {renderTabContent()}
      </div>
      <div className="tab-button-container">
        <TabButtons />
      </div>
    </div>
  );
}

export default Popup;
