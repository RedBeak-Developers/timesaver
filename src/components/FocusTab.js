import React from 'react';

function FocusTab() {
  const handleFocusMode = (focusTime, breakTime) => {
    if(typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync){
      chrome.storage.local.set({ focusTime, breakTime });
    }
  };

  return (
    <div>
      <div>
        <h2>Focus Tab</h2>
        <p>Focus mode, whitelist websites and set focus timer or make infinite, whitenoise/music</p>
        <button onClick={() => handleFocusMode(25, 5)}>Pomodoro 25/5</button>
        <p><b>Ideal For:</b> projects requiring short bursts of focus, like </p>
        <button onClick={() => handleFocusMode(52, 17)}>DeskTime 52/17</button>
        <p><b>Ideal For:</b> balancing strong focus with sufficient rest without losing momentum</p>
        <button onClick={() => handleFocusMode(90, 10)}>Ultradian Short 90/10</button>
        <p><b>Ideal For:</b> projects requiring prolonged focus, like deep writing sessions, coding, or studying complex topics</p>
        <button onClick={() => handleFocusMode(90, 30)}>Ultradian Long 90/30</button>
        <p><b>Ideal For:</b> projects requiring prolonged focus, like deep writing sessions, coding, or studying complex topics but over a longer time period</p>
        <button onClick={() => handleFocusMode(-1, 0)}>Infinite</button>
        <button onClick={() => handleFocusMode(1, 1)}>Custom</button>
      </div>
      <div>
        <button id="startFocus">start</button>
      </div>
    </div>
  );
}

export default FocusTab;

        