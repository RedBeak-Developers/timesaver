(()=>{let e={focusTime:1500,breakTime:300,timeLeft:1500,BGintervalID:null,typeRunning:0,isRunning:0};function t(t){console.log("Action: ".concat(t),JSON.stringify(e))}function n(){e.timeLeft-=1,e.timeLeft<=0&&(0===e.typeRunning?(e.timeLeft=e.breakTime,e.typeRunning=1):1===e.typeRunning&&(e.timeLeft=e.focusTime,e.typeRunning=0)),t("tickTimer")}function s(t){e={...e,...t}}chrome.runtime.onMessage.addListener(((i,o,a)=>{"setState"===i.message&&(console.log("setting the state in background.js"),s(i.state),a({status:"success setting state"})),"getState"===i.message?(console.log("asking background.js for state: isRunning, timeLeft e.t.c."),a(e)):"startTimer"===i.message?(console.log("setting the state before starting in background.js"),s(i.state),console.log("asking background.js to start timer"),t("startTimer"),0===e.isRunning?(e.BGintervalID=setInterval(n,1e3),e.isRunning=1,e.typeRunning=0):console.log("attempted to start a timer that isn't completely stopped"),a({status:"success starting timer"})):"stopTimer"===i.message?(console.log("asking background.js to stop timer"),null!=e.BGintervalID?(clearInterval(e.BGintervalID),e.isRunning=0,e.timeLeft=e.focusTime,e.BGintervalID=null):console.log("attempted to stop a timer when no timer exists in background.js - line 36"),a(e),a({status:"success stopping timer"})):"resumeTimer"===i.message?(console.log("asking background.js to resume timer"),2===e.isRunning?(e.BGintervalID=setInterval(n,1e3),e.isRunning=1,console.log("timer resumed")):console.log("attempted to resume a timer that is not paused"),a({status:"success resuming timer"})):"pauseTimer"===i.message&&(console.log("asking background.js to pause timer"),null!=e.BGintervalID?(clearInterval(e.BGintervalID),e.isRunning=2,e.BGintervalID=null,console.log("timer paused")):console.log("attempted to pause a timer when no timer exists in background.js - line 36"),a({status:"success pausing timer"}))}))})();