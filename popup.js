const data = {
  minutes: ''
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var display = document.querySelector('#countdown');
  display.textContent = request.minutes + ':' + request.seconds;
  document.getElementById('setAlarm').disabled = true;
});

// selectors
let selector = document.getElementById('selector');
selector.onchange = function(e) {
  let value = selector.options[selector.selectedIndex].value;
  data.minutes = parseInt(value);
};

// START button
let setAlarm = document.getElementById('setAlarm');
setAlarm.onclick = function(e) {
  if (data.minutes === '') return;
  chrome.runtime.sendMessage({
    time: data.minutes,
    STARTisPressed: true
  });
  document.getElementById('setAlarm').disabled = true;
};

// CLEAR button
let clearAlarm = document.getElementById('clearAlarm');
clearAlarm.onclick = function(e) {
  chrome.alarms.clearAll();
  chrome.runtime.sendMessage({ CLEARisPressed: true });
  document.querySelector('#countdown').innerHTML = '';
  document.getElementById('setAlarm').disabled = false;
};
