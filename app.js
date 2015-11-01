let express = require('express');
let Twit = require('twit');
let wordfilter = require('wordfilter');
let request = require('request');

let app = express();
app.get('/', function(req, res) {
  res.status(200).json({message:'The twitter bot is working just fine'});
});
app.listen(process.env.PORT || 3000);

import {API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET} from './config/config.json';

const TWEET_INTERVAL_HOURS = 6;
const T = new Twit({
  'consumer_key': process.env.API_KEY || API_KEY,
  'consumer_secret': process.env.API_SECRET || API_SECRET,
  'access_token': process.env.ACCESS_TOKEN || ACCESS_TOKEN,
  'access_token_secret': process.env.ACCESS_TOKEN_SECRET || ACCESS_TOKEN_SECRET
});

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

  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: 'GET'
    }, function(err, res) {
      if(err) {
        return err;
      }

      let { value } = JSON.parse(res.body);

      if(offensiveJoke(value.joke) || filterJoke(value.joke) || value.joke.length > 140) {
        getRandomJoke();
      } else {
        resolve(value.joke);
      }
    });
  });
}

function postTweet(tweet) {
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    if(err) {
      console.log('Failed to post tweet');
    }
  });
}

setInterval(async function() {
  let randomJoke = await getRandomJoke();
  postTweet(randomJoke);
}, (TWEET_INTERVAL_HOURS * 1000 * 60 * 60));

function trackMentions(twitterHandler) {
  let stream = T.stream('statuses/filter', {track:twitterHandler});

  stream.on('tweet', function(tweet) {
    let asker = tweet.user.screen_name;
    let text = tweet.text;

    console.log(`${asker} says ${text}`);
  });
}

trackMentions('@ChuckieNorrisie');
