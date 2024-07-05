import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, updateTimer, changeTimerSettings } from '../actions/timerActions';

function FocusTab() {
  const dispatch = useDispatch();
  const { focusTime, breakTime, timeLeft, isRunning, isFocus } = useSelector((state) => state.timer);
  //change the state values but dont push to chrome storage until started
  const handleFocusModeChange = (focusTime, breakTime, timeLeft) => {
    changeTimerSettings()
  };
  
  //on tab switch update
  useEffect(() => {
    chrome.runtime.sendMessage({ message: 'getState'}, (response) => {
      //currently running
      if(response.isRunning === 1) {

      }
      //currently paused
      else if(response.isRunning === 2) {

      }
    });
    dispatch(updateTimer());
  }, [dispatch]);

  //send message to background and change appearance
  const handleStart = () => {
    chrome.storage.sync.set( { focusTime: focusTime, breakTime: breakTime, timeLeft: timeLeft}, () => {
      console.log("focus, break and time left set in chrome storage sync");
    });
    chrome.runtime.sendMessage({ message: 'startTimer' }, (response) => {
      console.log(response);
  });
    dispatch(startTimer());
  };

  const handleStop = () => {
    chrome.runtime.sendMessage({ message: 'stopTimer' }, (response) => {
      console.log(response);
    });
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
        <button className={(focusTime === 25 && breakTime === 5) ? 'buttonPressed' : 'buttonNormal'} onClick={() => handleFocusModeChange(25, 5)}>Pomodoro 25/5</button>
        <p><b>Ideal For:</b> projects requiring short bursts of focus</p>
        <button className={(focusTime === 52 && breakTime === 17) ? 'buttonPressed' : 'buttonNormal'} onClick={() => handleFocusModeChange(52, 17)}>DeskTime 52/17</button>
        <p><b>Ideal For:</b> balancing strong focus with sufficient rest without losing momentum</p>
        <button className={(focusTime === 90 && breakTime === 10) ? 'buttonPressed' : 'buttonNormal'} onClick={() => handleFocusModeChange(90, 10)}>Ultradian Short 90/10</button>
        <p><b>Ideal For:</b> projects requiring prolonged focus, like deep writing sessions, coding, or studying complex topics</p>
        <button className={(focusTime === 90 && breakTime === 30) ? 'buttonPressed' : 'buttonNormal'} onClick={() => handleFocusModeChange(90, 30)}>Ultradian Long 90/30</button>
        <p><b>Ideal For:</b> projects requiring prolonged focus, like deep writing sessions, coding, or studying complex topics but over a longer time period</p>
        <button className={(focusTime === -1 && breakTime === 0) ? 'buttonPressed' : 'buttonNormal'} onClick={() => handleFocusModeChange(-1, 0)}>Infinite</button>
        <button onClick={() => handleFocusModeChange(1, 1)}>Custom</button>
      </div>
      <div>
        <button id="startFocus" onClick={handleStart}>Start</button>
      </div>
    </div>
  );
}

export default FocusTab;
