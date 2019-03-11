'use strict';

var TimerSetInterval;

// countdown timer function
function startTimer(duration, display) {
  var duration = duration * 60; // convert minutes to millisecond
  var timer = duration,
    minutes,
    seconds;
  TimerSetInterval = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    chrome.runtime.sendMessage({ minutes: minutes, seconds: seconds });

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

// when START button is pressed and received data from props.js,
// create an alarm and start countdown timer,
// or stop the timer when CLEAR button is pressed.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.STARTisPressed) {
    chrome.alarms.create('alarm_1', {
      periodInMinutes: request.time
    });
    startTimer(request.time);
  }
  if (request.CLEARisPressed) {
    clearInterval(TimerSetInterval);
  }
});

// When an alarm is fired, send a notification.
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'alarm_1') {
    chrome.notifications.create({
      type: 'basic',
      title: 'Time to take a break!',
      message: `Stand up from chair. Take eyes break.`,
      iconUrl: 'images/otter1.png',
      requireInteraction: true
    });
  }
});
