let timerState = {
  focusTime: 25 * 60,
  breakTime: 5 * 60,
  timeLeft: 25 * 60,
  intervalID: null,
  typeRunning: 0, //0 is focusTime running or paused, 1 is breakTime running or paused
  isRunning: 0, //0 is not running, 1 is running, 2 is paused
}

//gets the timer according to what is in chrome.storage
function getTimer(){
    chrome.storage.sync.get((result) =>{
      console.log("set timer in background.js based on chrome storage");
      timerState.focusTime = result.focusTime;
      timerState.breakTime = result.breakTime;
      timerState.timeLeft = result.focusTime;
    });
}

//switches the timer from focus to break mode or vice versa
function switchTimer(){
  //running or paused in focus mode
  if(timerState.typeRunning === 0){
    timerState.timeLeft = timerState.breakTime;
    timerState.typeRunning = 1;
  }
  //running or paused in break mode
  else if(timerState.typeRunning === 1){
    timerState.timeLeft = timerState.focusTime;
    timerState.typeRunning = 0;
  }
}

//starts the timer using set timer to get the vars from storage
function startTimer(){
  if(timerState.isRunning === 0){
    getTimer();
    console.log("interval started in background.js line 11")
    timerState.intervalID = setInterval(tickTimer, 1000);
    timerState.isRunning = true;
  }
  else{
    console.log("attempted to start a timer that isn't completely stopped")
  }
}

//when the timer is stopped, stop the interval and reset time left
function stopTimer(){
  if(timerState.intervalID != null){
    clearInterval(timerState.intervalID);
    timerState.isRunning = 0;
    timerState.timeLeft = timerState.focusTime;
  }
  else{
    console.log("attempted to stop a timer when no timer exists in background.js - line 36");
  }
}

function resumeTimer(){
  console.log("timer resumed");
  timerState.intervalID = setInterval(tickTimer(), 1000)
}

//when the timer is paused, stop the interval and save the time remaining
function pauseTimer(){
  if(timerState.intervalID != null){
    clearInterval(timerState.intervalID);
    timerState.isRunning = 2; //pause mode
    console.log("timer paused");
  }
  else{
    console.log("attempted to pause a timer when no timer exists in background.js - line 36");
  }
}

//
function tickTimer(){
  timerState.timeLeft =- 1;
  if(timerState.timeLeft <= 0) {
    switchTimer();
  }
}


//send the time left in the timer to other components
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.message === 'setState') {
    console.log('setting the state in background.js');
    timerState = request.state;
  }
  if(request.message === 'getState') {
    console.log("asking background.js for state: isRunning, timeLeft e.t.c.");
    sendResponse(timerState);
  }
  //listen for startTimer and then begin decrementing timer
  else if(request.message === 'startTimer'){
    console.log("asking background.js to start timer");
    startTimer();
  }
  else if(request.message === 'stopTimer'){
    console.log("asking background.js to stop timer");
    stopTimer();
    sendResponse(timerState);
  }
  else if(request.message === 'resumeTimer'){
    console.log("asking background.js to resume timer");
    resumeTimer();
    sendResponse(timerState);
  }
  else if(request.message === 'pauseTimer'){
    console.log("asking background.js to pause timer");
    pauseTimer();
    sendResponse(timerState);
  }
});
