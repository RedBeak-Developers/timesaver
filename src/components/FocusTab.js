import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, pauseTimer, updateTimer, resumeTimer, tickTimer } from '../slices/timerSlice';

function FocusTab() {
  const dispatch = useDispatch();    //0=focus 1=break //0=stopped 1=running 2=paused
  const { focusTime, breakTime, timeLeft, typeRunning, isRunning } = useSelector((state) => state.timer);
  const [intervalId, setIntervalId] = useState(null);

  //change the state values but dont push to chrome storage until started
  const handleFocusModeChange = (focusTime, breakTime) => {
    updateTimer(focusTime, breakTime, focusTime, 0, 0);
  };
  
  //on tab switch update
  useEffect(() => {
    //get current timer state from background
    chrome.runtime.sendMessage({ message: 'getState'}, (response) => {
      //update it in redux
      dispatch(updateTimer(response.focusTime, response.breakTime, response.timeLeft, response.typeRunning, response.isRunning))
      //currently running
      if(response.isRunning === 1) {
        dispatch(resumeTimer()); //maybe use start here resume should be for pausing and unpausing in tab
      }
      //currently paused
      else if(response.isRunning === 2) {
        dispatch(pauseTimer());
      }
    });
    dispatch(updateTimer());
  }, [dispatch]);

  //handles timer ticking
  useEffect(() => {
    if (isRunning === 1 && !intervalId) {
      const id = setInterval(() => {
        dispatch(tickTimer());
      }, 1000);
      setIntervalId(id);
    } else if (isRunning === 0 && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, intervalId, dispatch]);

  //send message to background and change appearance
  const handleStart = () => {
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

  const handlePause = () => {
    chrome.runtime.sendMessage({ message: 'pauseTimer' }, (response) => {
      console.log(response);
    });
    dispatch(pauseTimer());
  }

  const handleResume = () => {
    chrome.runtime.sendMessage({ message: 'resumeTimer' }, (response) => {
      console.log(response);
    });
    dispatch(resumeTimer());
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

    return (
      <div>
        {isRunning !== 0 ? (
          <div>
            <h2>{typeRunning === 0 ? 'Focus Time' : 'Break Time'}</h2>
            <div className="timer">
              <span>{formatTime(timeLeft)}</span>
            </div>
            {isRunning === 1 ? (
              <>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleStop}>Stop</button>
              </>
            ) : (
              <button onClick={handleResume}>Resume</button>
            )}
          </div>
        ) : (
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
        )}
      </div>
    );
  } 

export default FocusTab;
