let Twit = require('twit');

const API_KEY = TWITTER.API_KEY;
const API_SECRET = TWITTER.API_SECRET;
const ACCESS_TOKEN = TWITTER.ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = TWITTER.ACCESS_TOKEN_SECRET;

const T = new Twit({
  'consumer_key': API_KEY,
  'consumer_secret': API_SECRET,
  'access_token': ACCESS_TOKEN,
  'access_token_secret': ACCESS_TOKEN_SECRET
});

module.exports = {
  T: T
};