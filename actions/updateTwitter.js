import { getRandomJoke } from '../helpers/helpers';
import { postTweet } from '../helpers/twitterActions';

async function updateTwitter() {
  let randomJoke = await getRandomJoke(140);
  postTweet(randomJoke);
}

module.exports = {
  updateTwitter: updateTwitter
};