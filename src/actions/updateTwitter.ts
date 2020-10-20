import { postTweet } from '../helpers/twitterActions'
import { getRandomJoke } from '../helpers/utils'

export async function updateTwitter () {
  const randomJoke = await getRandomJoke(140)
  postTweet(randomJoke)
}
