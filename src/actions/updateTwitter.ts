import { postTweet } from '../helpers/twitterActions'
import { getRandomJoke } from '../helpers/utils'

export async function updateTwitter (): Promise<void> {
  const randomJoke: string = await getRandomJoke(140)
  postTweet(randomJoke)
}
