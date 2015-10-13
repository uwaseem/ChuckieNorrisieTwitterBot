let Twit = require('twit');
let wordfilter = require('wordfilter');

let config = require('./config/config.json');

let T = new Twit({
  'consumer_key': config.API_KEY,
  'consumer_secret': config.API_SECRET,
  'access_token': config.ACCESS_TOKEN,
  'access_token_secret': config.ACCESS_TOKEN_SECRET   
});

console.log(T);