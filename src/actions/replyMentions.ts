import { T } from '../helpers/twitterConnect'
import { postTweet } from '../helpers/twitterActions'
import { getRandomJoke } from '../helpers/utils'

function trackMentions (twitterHandler): void {
  const stream = T.stream('statuses/filter', { track: twitterHandler })

  stream.on('tweet', (tweet) => {
    const asker: string = `@${tweet.user.screen_name}`
    const tweetId: string = tweet.id_str
    replyTweetWithJoke(asker, tweetId)
  })
}

async function replyTweetWithJoke (asker: string, tweetId: string): Promise<void> {
  const randomJoke: string = await getRandomJoke(140 - asker.length)
  const tweet: string = `${asker} ${randomJoke}`
  postTweet(tweet, tweetId)
}

export function replyMentions (): void {
  trackMentions('@ChuckieNorrisie')
}
