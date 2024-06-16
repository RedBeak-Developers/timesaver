import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, tickTimer } from '../actions/timerActions';
import mockChrome from '../utils/mockChrome';

// Use mockChrome if the real Chrome API is not available
const chrome = typeof window.chrome !== 'undefined' ? window.chrome : mockChrome;

function FocusTab() {
  const dispatch = useDispatch();
  const { timeLeft, isRunning, isFocus } = useSelector((state) => state.timer);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        dispatch(tickTimer());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, dispatch]);

  const handleFocusModeChange = (focusTime, breakTime) => {
    if (chrome.storage && chrome.storage.local) {
      // Set focusTime and breakTime in local storage
      chrome.storage.local.set({ focusTime, breakTime }, () => {
        console.log(`Set focusTime: ${focusTime}, breakTime: ${breakTime}`);

        // Retrieve the stored values to log them
        chrome.storage.local.get(['focusTime', 'breakTime'], (result) => {
          console.log(`Retrieved focusTime: ${result.focusTime}, breakTime: ${result.breakTime}`);
        });
      });
    }
  };

  const handleStart = () => {
    if (chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['focusTime', 'breakTime'], (result) => {
        const focusTime = result.focusTime || 25;
        const breakTime = result.breakTime || 5;
        dispatch(startTimer(focusTime, breakTime));
      });
    }
  };

  const handleStop = () => {
    dispatch(stopTimer());
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isRunning) {
    return (
      <div>
        <h2>{isFocus ? 'Focus Time' : 'Break Time'}</h2>
        <div className="timer">
          <span>{formatTime(timeLeft)}</span>
        </div>
        <button onClick={handleStop}>Stop</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Focus Tab</h2>
        <p>Focus mode, whitelist websites and set focus timer or make infinite, whitenoise/music</p>
        <button onClick={() => handleFocusModeChange(25, 5)}>Pomodoro 25/5</button>
        <p><b>Ideal For:</b> projects requiring short bursts of focus</p>
        <button onClick={() => handleFocusModeChange(52, 17)}>DeskTime 52/17</button>
        <p><b>Ideal For:</b> balancing strong focus with sufficient rest without losing momentum</p>
        <button onClick={() => handleFocusModeChange(90, 10)}>Ultradian Short 90/10</button>
        <p><b>Ideal For:</b> projects requiring prolonged focus, like deep writing sessions, coding, or studying complex topics</p>
        <button onClick={() => handleFocusModeChange(90, 30)}>Ultradian Long 90/30</button>
        <p><b>Ideal For:</b> projects requiring prolonged focus, like deep writing sessions, coding, or studying complex topics but over a longer time period</p>
        <button onClick={() => handleFocusModeChange(-1, 0)}>Infinite</button>
        <button onClick={() => handleFocusModeChange(1, 1)}>Custom</button>
      </div>
      <div>
        <button id="startFocus" onClick={handleStart}>Start</button>
      </div>
    </div>
  );
}

export default FocusTab;
