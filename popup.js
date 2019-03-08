var countingTimer;

const data = {
  reset: false,
  minutes: ''
};

// selectors
let time = document.getElementById('time');
time.onchange = function(e) {
  let value = time.options[time.selectedIndex].value;
  data.minutes = value;
  data.minutes = parseInt(value);
};

// START button
let setAlarm = document.getElementById('setAlarm');
setAlarm.onclick = function(e) {
  var time = data.minutes * 60;
  var display = document.querySelector('#countdown');
  data.reset = false;
  startTimer(time, display);
  chrome.runtime.sendMessage({ time: data.minutes });
};

// RESET button
let clearAlarm = document.getElementById('clearAlarm');
clearAlarm.onclick = function(e) {
  chrome.alarms.clearAll();
  //   chrome.alarms.onAlarm.removeListener(alarmListener);
  document.querySelector('#countdown').innerHTML = '';
  clearInterval(countingTimer);
  data.reset = true;
};

// countdown timer
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  countingTimer = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
