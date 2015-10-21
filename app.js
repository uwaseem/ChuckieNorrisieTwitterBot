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

function callback(err, result) {
  if(err) {
    console.log(err, ' <------ in callback');
    return;
  } else {
    console.log(result, ' <------ in callback');
    return result;
  }
}

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

function getRandomJoke(callback) {
  let url = 'http://api.icndb.com/jokes/random?exclude=[explicit]';

  request({
    url: url,
    method: 'GET'
  }, function(err, res) {
    if(err) {
      console.log('Failed');
      return err;
    }

    let { value } = JSON.parse(res.body);
    if(offensiveJoke(value.joke) || filterJoke(value.joke) || value.joke.length > 140) {
      getRandomJoke(callback);
    } else {
      console.log(value.joke, ' <------- in function');
      callback(err, value.joke);
    }
  });
}

/*function postTweet(tweet) {
  T.post('statuses/update', {
    status: tweet || 'Test, this is my first tweet',
  }, function(err, data, response) {
    if(err) {
      return;
    }
    console.log('done');
  });
}*/

setInterval(function() {
  console.log('HELLO');
  let randomJoke = getRandomJoke(callback);
  setTimeout(function() {
    console.log(randomJoke);
  }, 3000);
}, 5000);
