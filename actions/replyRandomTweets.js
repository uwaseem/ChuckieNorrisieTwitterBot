import { T } from '../helpers/twitterConnect';
import { postTweet } from '../helpers/twitterActions';
import { breakName, getRandomJoke } from '../helpers/helpers';

function trackTweets() {
  let stream = T.stream('statuses/filter', {track: 'I want to be like Chuck Norris'});

  stream.on('tweet', function(tweet) {
    let asker = `@${tweet.user.screen_name}`;
    let name = breakName(tweet.user.name, 2);
    let tweetId = tweet.id_str;
    replyTweetWithJoke();
  });
}

async function replyTweetWithJoke() {
  let randomJoke = await getRandomJoke(140 - asker, name[0], name[1]);
}

function replyRandomTweets() {
  trackTweets();
}

module.exports = {
  replyRandomTweets: replyRandomTweets
};