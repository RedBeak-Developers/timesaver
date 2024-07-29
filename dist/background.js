let timerState={focusTime:1500,breakTime:300,timeLeft:1500,BGintervalID:null,typeRunning:0,isRunning:0};function getTimer(){chrome.storage.sync.get((t=>{console.log("set timer in background.js based on chrome storage"),timerState.focusTime=t.focusTime,timerState.breakTime=t.breakTime,timerState.timeLeft=t.focusTime}))}function switchTimer(){0===timerState.typeRunning?(timerState.timeLeft=timerState.breakTime,timerState.typeRunning=1):1===timerState.typeRunning&&(timerState.timeLeft=timerState.focusTime,timerState.typeRunning=0)}function startTimer(){0===timerState.isRunning?(timerState.BGintervalID=setInterval(tickTimer,1e3),timerState.isRunning=1,timerState.typeRunning=0):console.log("attempted to start a timer that isn't completely stopped")}function stopTimer(){null!=timerState.BGintervalID?(clearInterval(timerState.BGintervalID),timerState.isRunning=0,timerState.timeLeft=timerState.focusTime,timerState.BGintervalID=null):console.log("attempted to stop a timer when no timer exists in background.js - line 36")}function resumeTimer(){2===timerState.isRunning?(timerState.BGintervalID=setInterval(tickTimer(),1e3),timerState.isRunning=1,console.log("timer resumed")):console.log("attempted to resume a timer that is not paused")}function pauseTimer(){null!=timerState.BGintervalID?(clearInterval(timerState.BGintervalID),timerState.isRunning=2,timerState.BGintervalID=null,console.log("timer paused")):console.log("attempted to pause a timer when no timer exists in background.js - line 36")}function tickTimer(){timerState.timeLeft-=1,timerState.timeLeft<=0&&switchTimer()}function setState(t){timerState=t}chrome.runtime.onMessage.addListener(((t,e,i)=>{"setState"===t.message&&(console.log("setting the state in background.js"),setState(t.state)),"getState"===t.message?(console.log("asking background.js for state: isRunning, timeLeft e.t.c."),i(timerState)):"startTimer"===t.message?(console.log("setting the state before starting in background.js"),setState(t.state),console.log("asking background.js to start timer"),startTimer()):"stopTimer"===t.message?(console.log("asking background.js to stop timer"),stopTimer(),i(timerState)):"resumeTimer"===t.message?(console.log("asking background.js to resume timer"),resumeTimer(),i(timerState)):"pauseTimer"===t.message&&(console.log("asking background.js to pause timer"),pauseTimer(),i(timerState))}));