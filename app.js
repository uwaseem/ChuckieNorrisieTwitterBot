let express = require('express');
let Twit = require('twit');
let wordfilter = require('wordfilter');
let request = require('request');

let app = express();
app.get('/', function(req, res) {
  res.status(200).json({message:'The twitter bot is working just fine'});
});
app.listen(process.env.PORT || 3000);

import { API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET, GOOGLE_API_KEY, CUSTOM_SEARCH_ID } from './config/config.json';

const URL_ICNDB = 'http://api.icndb.com/jokes';
const URL_GOOGLE_CS = 'https://www.googleapis.com/customsearch/v1';

const SHORTENED_LINK_LENGTH = 23;

const T = new Twit({
  'consumer_key': API_KEY,
  'consumer_secret': API_SECRET,
  'access_token': ACCESS_TOKEN,
  'access_token_secret': ACCESS_TOKEN_SECRET
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
      return err;
    }
  });
}

function postTweetMedia(tweet, media) {
  console.log('masuk media post');
  T.post('media/upload', {media_date: media}, function(err, data, response) {
    if(err) {
      console.log('Failed to post tweet with media ', err);
      return err;
    }
    let mediaId = data.media_id_string;
    let fullTweet = {status: tweet, media_ids: [mediaId]};

    postTweet(fullTweet);
  });
}

function updateTwitter() {
  setInterval(async function() {
    let randomJoke = await getRandomJoke(maxLength);
    postTweet(randomJoke);
  }, (6 * 1000 * 60 * 60));
}

function trackMentions(twitterHandler) {
  let stream = T.stream('statuses/filter', {track:twitterHandler});

  stream.on('tweet', function(tweet) {
    let asker = `@${tweet.user.screen_name}`;
    replyTweetWithJoke(asker);
  });
}

function imageSearch(query) {
  query = query.replace(/ /g, '+');
  let url = `${URL_GOOGLE_CS}?key=${GOOGLE_API_KEY}&cx=${CUSTOM_SEARCH_ID}&q=${query}&searchType=image&imgColorType=color`;

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
}

async function replyTweetWithJoke(asker) {
  // let images = await imageSearch('Chuck Norris Portrait');
  // let imageLink = images[randomNumber(0, 9)].image.thumbnailLink;
  // let imageLink = images[randomNumber(0, 9)].link;
  let randomJoke = await getRandomJoke(140 - asker.length/* - SHORTENED_LINK_LENGTH*/);
  let tweet = `${asker} ${randomJoke}`;
  // postTweetMedia(tweet, new Buffer(imageLink).toString('base64'));
  postTweet(tweet);
}

/*ACTIONS*/
// replyTweetWithJoke('@UWaseem24');
trackMentions('@ChuckieNorrisie');
updateTwitter();
