import { T } from '../helpers/twitterConnect';
import { postTweet } from '../helpers/twitterActions';
import { getRandomJoke } from '../helpers/helpers';

function trackMentions(twitterHandler) {
  let stream = T.stream('statuses/filter', {track:twitterHandler});

  stream.on('tweet', function(tweet) {
    let asker = `@${tweet.user.screen_name}`;
    let tweetId = tweet.id_str;
    replyTweetWithJoke(asker, tweetId);
  });
}

async function replyTweetWithJoke(asker, tweetId) {
  let randomJoke = await getRandomJoke(140 - asker.length);
  let tweet = `${asker} ${randomJoke}`;
  postTweet(tweet, tweetId);
}

export function replyMentions() {
  trackMentions('@ChuckieNorrisie');
}
