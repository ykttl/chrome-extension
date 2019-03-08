'use strict';

chrome.runtime.onInstalled.addListener(function() {
  console.log('install');
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
      iconUrl: 'images/get_started48.png',
      requireInteraction: true
    });
  }
});
