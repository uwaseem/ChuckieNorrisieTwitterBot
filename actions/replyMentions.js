import { T } from '../helpers/twitterConnect';
import { postTweet } from '../helpers/twitterActions';
import { getRandomJoke } from '../helpers/helpers';
let { GOOGLE_API_KEY, CUSTOM_SEARCH_ID } = require ('../config/config.json').GOOGLE;

const URL_GOOGLE_CS = 'https://www.googleapis.com/customsearch/v1';
const SHORTENED_LINK_LENGTH = 23;

function trackMentions(twitterHandler) {
  let stream = T.stream('statuses/filter', {track:twitterHandler});

  stream.on('tweet', function(tweet) {
    let asker = `@${tweet.user.screen_name}`;
    replyTweetWithJoke(asker);
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

function replyMentions() {
  trackMentions('@ChuckieNorrisie');
}

module.exports = {
  replyMentions: replyMentions
};