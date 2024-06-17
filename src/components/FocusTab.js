import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, updateTimer, loadTimerSettings } from '../actions/timerActions';
import mockChrome from '../utils/mockChrome';

// Use mockChrome if the real Chrome API is not available
const chrome = typeof window.chrome !== 'undefined' ? window.chrome : mockChrome;

function FocusTab() {
  const dispatch = useDispatch();
  const { focusTime, breakTime, timeLeft, isRunning, isFocus } = useSelector((state) => state.timer);

  const handleFocusModeChange = (focusTime, breakTime) => {
    dispatch(loadTimerSettings(focusTime * 60, breakTime * 60));
  };

  useEffect(() => {
    if (chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ action: 'getTimerState' }, (response) => {
        dispatch(updateTimer(response));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  const handleStart = () => {
    if (chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ action: 'startFocus', focusTime, breakTime }, (response) => {
        console.log(response.status);
        dispatch(startTimer(focusTime, breakTime));
      });
    }
  };

  const handleStop = () => {
    if (chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ action: 'stopFocus' }, (response) => {
        console.log(response.status);
        dispatch(stopTimer());
      });
    }
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
