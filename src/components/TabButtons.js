import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../actions';
import './TabButtons.css';

function TabButtons() {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();

  return (
    <div className="tabs">
      <button
        className={activeTab === 'home' ? 'active' : 'inactive'}
        onClick={() => dispatch(setActiveTab('home'))}
      >
        Home
      </button>
      <button
        className={activeTab === 'focus' ? 'active' : 'inactive'}
        onClick={() => dispatch(setActiveTab('focus'))}
      >
        Focus
      </button>
      <button
        className={activeTab === 'block' ? 'active' : 'inactive'}
        onClick={() => dispatch(setActiveTab('block'))}
      >
        Block
      </button>
    </div>
  );
}

export default TabButtons;
