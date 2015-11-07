import { T } from './twitterConnect';

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