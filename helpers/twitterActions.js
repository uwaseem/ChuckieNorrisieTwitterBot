let Twit = require('twit');

let { API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = require ('../config/config.json').TWITTER;

const T = new Twit({
  'consumer_key': API_KEY,
  'consumer_secret': API_SECRET,
  'access_token': ACCESS_TOKEN,
  'access_token_secret': ACCESS_TOKEN_SECRET
});

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

module.exports = {
  postTweet: postTweet,
  postTweetMedia: postTweetMedia
};