import { T }         from '../helpers/twitterConnect';
import { postTweet } from '../helpers/twitterActions';

function tweetNewFollowers() {
  let stream = T.stream('user');

  stream.on('follow', function (event) {
    let follower = `@${event.source.screen_name}`;
    let followingId = event.source.id_str;
    let tweet = `${follower} Chuck Norris does not need Twitter. He is already following you.`;
    postTweet(tweet, followingId);
  });
}

module.exports = {
  tweetNewFollowers: tweetNewFollowers
};