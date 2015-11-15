import { postTweet } from '../helpers/twitterActions';
import { getRandomJoke } from '../helpers/helpers';

async function updateTwitter() {
  let randomJoke = await getRandomJoke(140);
  postTweet(randomJoke);
}

module.exports = {
  updateTwitter: updateTwitter
};