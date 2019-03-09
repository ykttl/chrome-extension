document.addEventListener('DOMContentLoaded', function() {});

chrome.storage.local.set({
  isOpenedFirstTime: true
});

// タブ開くとこれが起動する
chrome.storage.local.get('timeStamp', function(storageData) {
  // if (storageData.isOpenedFirstTime === true) {
  //   return;
  // } else {
  //   alert('aaa');
  //   chrome.storage.local.set({
  //     isOpenedFirstTime: false
  //   });
  // }

  // var newMinutes = storageData.minutes * 60;
  // var newSeconds = storageData.seconds * 1000;
  // var newTime = newMinutes + newSeconds;

  if (storageData.timeStamp) {
    var display = document.querySelector('#countdown');
    alert(Date.now());
    var test = Date.now() - storageData.timeStamp;
    startTimer(test / 60000, display);
  } else {
    alert('gagagan');
  }

  //startTimer(10, display);
});

// document.addEventListener('unload', function() {
//   alert('====');
// });

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
  if (data.minutes === '') return;
  // chrome.storage.local.set({ minutes: minutes }, function() {
  //   console.log('saved minute data in local!');
  // });
  var time = data.minutes * 60;
  var display = document.querySelector('#countdown');
  data.reset = false;
  startTimer(time, display);
  chrome.runtime.sendMessage({ time: data.minutes });
  chrome.storage.local.set({ timeStamp: Date.now() });
};

// CLEAR button
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

    // chrome.storage.local.set(
    //   { minutes: minutes, seconds: seconds },
    //   function() {
    //     console.log('test');
    //   }
    // );

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
