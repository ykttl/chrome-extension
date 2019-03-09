'use strict';

var countingTimer;

// countdown timer
function startTimer(duration, display) {
  var timer = duration * 60,
    minutes,
    seconds;
  countingTimer = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    //display.textContent = minutes + ':' + seconds;
    chrome.runtime.sendMessage({ minutes: minutes, seconds: seconds });
    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

// chrome.storage.local.get('numnum', function(data) {
//   // chrome.alarms.create('alarm_1', {
//   //   periodInMinutes: parseInt(data.numnum, 10)
//   // });
//   // startTimer(data.numnum);
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'm1') {
    chrome.alarms.create('alarm_1', {
      periodInMinutes: 1
    });
    startTimer(request.time);
  }
  if (request.playCountDown === false) {
    clearInterval(countingTimer);
  }
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'alarm_1') {
    chrome.notifications.create({
      type: 'basic',
      title: 'Time to stan up and do excersize!',
      message: '30 pun tatimashita',
      iconUrl: 'images/otter1.png',
      requireInteraction: true
    });
  }
});
