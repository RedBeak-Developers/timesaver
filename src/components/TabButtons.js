import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../slices/tabSlice';
import './TabButtons.css';

function TabButtons() {
  const currentTab = useSelector((state) => state.tab.currentTab);
  const dispatch = useDispatch();

  return (
    <div className="tabs">
      <button
        className={currentTab === 'home' ? 'active' : 'inactive'}
        onClick={() => dispatch(setActiveTab('home'))}
      >
        Home
      </button>
      <button
        className={currentTab === 'focus' ? 'active' : 'inactive'}
        onClick={() => dispatch(setActiveTab('focus'))}
      >
        Focus
      </button>
      <button
        className={currentTab === 'block' ? 'active' : 'inactive'}
        onClick={() => dispatch(setActiveTab('block'))}
      >
        Block
      </button>
    </div>
  );
}

export default TabButtons;
