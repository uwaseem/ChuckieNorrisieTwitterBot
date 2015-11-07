let Twit = require('twit');

let { API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = require ('../config/config.json').TWITTER;

const T = new Twit({
  'consumer_key': API_KEY,
  'consumer_secret': API_SECRET,
  'access_token': ACCESS_TOKEN,
  'access_token_secret': ACCESS_TOKEN_SECRET
});

module.exports = {
  T: T
};