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

let randomJoke;

function offensiveJoke(word) {
  if(!wordfilter.blacklisted(word)) {
    return false;
  } else {
    return true;
  }
}

function filterJoke(joke) {
  if(joke.match(/(&quot;)/)) {
    return true;
  } else {
    return false;
  }
}

function getRandomJoke() {
  let url = 'http://api.icndb.com/jokes/random?exclude=[explicit]';

  request({
    url: url,
    method: 'GET'
  }, function(err, res) {
    if(err) {
      console.log('Failed');
      return;
    }

    let { value } = JSON.parse(res.body);
    if(offensiveJoke(value.joke) || filterJoke(value.joke) || value.joke > 140) {
      getRandomJoke();
    } else {
      return value.joke;
    }
  });
}

function postTweet(tweet) {
  T.post('statuses/update', {
    status: tweet || 'Test, this is my first tweet',
  }, function(err, data, response) {
    if(err) {
      return;
    }
    console.log('done');
  });
}


setInterval(function() {
  randomJoke = getRandomJoke();
  // postTweet(randomJoke);
}, 5000);