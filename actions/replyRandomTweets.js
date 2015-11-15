import { T }             from '../helpers/twitterConnect';
import { postTweet }     from '../helpers/twitterActions';
import { getRandomJoke } from '../helpers/helpers';

function trackTweets() {
  let stream = T.stream('statuses/filter', {track: 'I want to be like Chuck Norris'});

  stream.on('tweet', function(tweet) {
    let asker = `@${tweet.user.screen_name}`;
    let tweetId = tweet.id_str;
    console.log(tweet);
    console.log(`${asker} is tweeting something now`);
  });
}

function replyRandomTweets() {
  trackTweets();
}


module.exports = {
  replyRandomTweets: replyRandomTweets
};