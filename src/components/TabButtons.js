import React from 'react';
import './TabButtons.css';

function TabButtons({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button
        className={activeTab === 'home' ? 'active' : 'inactive'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </button>
      <button
        className={activeTab === 'focus' ? 'active' : 'inactive'}
        onClick={setActiveTab('focus')}
      >
        Focus
      </button>
      <button
        className={activeTab === 'block' ? 'active' : 'inactive'}
        onClick={setActiveTab('block')}
      >
        Block
      </button>
    </div>
  );
}

export default TabButtons;
