'use strict';

console.log('hello!');
// chrome.runtime.onInstalled.addListener(function() {
//   console.log('install');
// });

chrome.storage.local.set({
  // date: date,
  // isPaused: false,
  // countdownMaxInMin: countdownMaxInMin
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.alarms.create('alarm_1', {
    periodInMinutes: parseInt(request.time, 10)
  });
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
