let timerState = {
  focusTime: 25 * 60,
  breakTime: 5 * 60,
  timeLeft: 25 * 60,
  BGintervalID: null,
  typeRunning: 0, //0 is focusTime running or paused, 1 is breakTime running or paused
  isRunning: 0, //0 is not running, 1 is running, 2 is paused
}

function logTimerState(action) {
  console.log(`Action: ${action}`, JSON.stringify(timerState));
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
  logTimerState('startTimer');
  if(timerState.isRunning === 0){
    timerState.BGintervalID = setInterval(tickTimer, 1000);
    timerState.isRunning = 1;
    timerState.typeRunning = 0;
  }
  else{
    console.log("attempted to start a timer that isn't completely stopped")
  }
}

//when the timer is stopped, stop the interval and reset time left
function stopTimer(){
  if(timerState.BGintervalID != null){
    clearInterval(timerState.BGintervalID);
    timerState.isRunning = 0;
    timerState.timeLeft = timerState.focusTime;
    timerState.BGintervalID = null;
  }
  else{
    console.log("attempted to stop a timer when no timer exists in background.js - line 36");
  }
}

function resumeTimer(){
  if(timerState.isRunning === 2) {
    timerState.BGintervalID = setInterval(tickTimer, 1000);
    timerState.isRunning = 1;
    console.log("timer resumed");
  }
  else {
    console.log("attempted to resume a timer that is not paused");
  }
}

//when the timer is paused, stop the interval and save the time remaining
function pauseTimer(){
  if(timerState.BGintervalID != null){
    clearInterval(timerState.BGintervalID);
    timerState.isRunning = 2; //pause mode
    timerState.BGintervalID = null;
    console.log("timer paused");
  }
  else{
    console.log("attempted to pause a timer when no timer exists in background.js - line 36");
  }
}

//
function tickTimer(){
  timerState.timeLeft -= 1;
  if(timerState.timeLeft <= 0) {
    switchTimer();
  }
  logTimerState('tickTimer')
}

//sets the timer state in background, this is used right before starting the timer in background or resuming
//so that it knows how much focus time/break time is left
function setState(state) {
  timerState = {
    ...timerState, // existing properties
    ...state // new properties to update
  };
}

//send the time left in the timer to other components
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.message === 'setState') {
    console.log('setting the state in background.js');
    setState(request.state);
    sendResponse({ status: "success setting state"});
  }
  if(request.message === 'getState') {
    console.log("asking background.js for state: isRunning, timeLeft e.t.c.");
    sendResponse(timerState);
  }
  //listen for startTimer and then begin decrementing timer
  else if(request.message === 'startTimer'){
    console.log('setting the state before starting in background.js');
    setState(request.state);
    console.log("asking background.js to start timer");
    startTimer();
    sendResponse({ status: "success starting timer"});
  }
  else if(request.message === 'stopTimer'){
    console.log("asking background.js to stop timer");
    stopTimer();
    sendResponse(timerState);
    sendResponse({ status: "success stopping timer"});
  }
  else if(request.message === 'resumeTimer'){
    //resuming probably doesnt need to set state since background holds the main info of the timer
    console.log("asking background.js to resume timer");
    resumeTimer();
    sendResponse({ status: "success resuming timer"});
  }
  else if(request.message === 'pauseTimer'){
    console.log("asking background.js to pause timer");
    pauseTimer();
    sendResponse({ status: "success pausing timer"});
  }
});
