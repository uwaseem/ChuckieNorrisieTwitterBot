import { T } from '../helpers/twitterConnect';
import { postTweet } from '../helpers/twitterActions';
import { getRandomJoke } from '../helpers/helpers';

function trackTweets() {
  let stream = T.stream('statuses/filter', {track: 'Testing One Two Thre'});

  stream.on('tweet', function(tweet) {
    let asker = `@${tweet.user.screen_name}`;
    let tweetId = tweet.id_str;
  });
}

function replyRandomTweets() {
  trackTweets();
}


module.exports = {
  replyRandomTweets: replyRandomTweets
};