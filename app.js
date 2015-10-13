let Twit = require('twit');
let wordfilter = require('wordfilter');
let request = require('request');

import {API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET} from './config/config.json';

const T = new Twit({
  'consumer_key': API_KEY,
  'consumer_secret': API_SECRET,
  'access_token': ACCESS_TOKEN,
  'access_token_secret': ACCESS_TOKEN_SECRET
});

/*getRandomJoke => */
function getRandomJoke() {
  let url = 'http://api.icndb.com/jokes/random?firstName=John&amp;lastName=Doe';

  request({
    url: url,
    method: 'GET'
  }, function(err, res) {
    if(err) {
      console.log('Failed');
      return;
    }

    console.log(res.body);
  });
}

getRandomJoke();