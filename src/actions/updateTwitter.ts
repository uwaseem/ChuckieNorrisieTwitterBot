import { postTweet } from '../helpers/twitterActions'
import { getRandomJoke } from '../helpers/helpers'

export async function updateTwitter () {
  const randomJoke = await getRandomJoke(140)
  postTweet(randomJoke)
}
