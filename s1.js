var options = {
  type: 'basic',
  title: 'Time to stan up and do excersize!',
  message: '30 pun tatimashita',
  iconUrl: 'images/get_started48.png'
};

chrome.notifications.create(options, callback);

function callback() {
  console.log('popup done!');
}
