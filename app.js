let express = require('express');
let Twit = require('twit');
let wordfilter = require('wordfilter');
let request = require('request');

let app = express();
app.get('/', function(req, res) {
  res.status(200).json({message:'The twitter bot is working just fine'});
});
app.listen(process.env.PORT || 3000);

import {API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET, GOOGLE_CUSTOM_SEARCH, GOOGLE_CS_ID} from './config/config.json';

const URL_ICNDB = 'http://api.icndb.com/jokes';
const URL_GOOGLE_CS = 'https://www.googleapis.com/customsearch/v1';

const T = new Twit({
  'consumer_key': API_KEY,
  'consumer_secret': API_SECRET,
  'access_token': ACCESS_TOKEN,
  'access_token_secret': ACCESS_TOKEN_SECRET
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

function getRandomJoke(maxLength) {
  let url = `${URL_ICNDB}/random?exclude=[explicit]`;

  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: 'GET'
    }, function(err, res) {
      if(err) {
        return err;
      }

      let { value } = JSON.parse(res.body);

      if(offensiveJoke(value.joke) || filterJoke(value.joke) || value.joke.length > maxLength) {
        getRandomJoke(maxLength);
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

function tweetJoke() {
  setInterval(async function() {
    let randomJoke = await getRandomJoke(maxLength);
    postTweet(randomJoke);
  }, (6 * 1000 * 60 * 60));
}

function trackMentions(twitterHandler) {
  let stream = T.stream('statuses/filter', {track:twitterHandler});

  stream.on('tweet', function(tweet) {
    let asker = tweet.user.screen_name;
    let text = tweet.text;

    console.log(`${asker} says ${text}`);
  });
}

function imageSearch(query) {
  query = query.replace(/ /g, '+');
  let url = `${URL_GOOGLE_CS}?key=${GOOGLE_CUSTOM_SEARCH}&cx=${GOOGLE_CS_ID}&q=${query}&searchType=image&imgColorType=color`;

  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: 'GET',
    }, function(err, res) {
      if(err) {
        return err;
      }
      let { items } = JSON.parse(res.body);
      resolve(items);
    });
  });
};

/*ACTIONS*/
imageSearch('Chuck Norris Portrait');
// trackMentions('@ChuckieNorrisie');
// tweetJoke();
