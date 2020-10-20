import { T } from '../helpers/twitterConnect'
import { postTweet } from '../helpers/twitterActions'
import { getRandomJoke } from '../helpers/utils'

function trackMentions (twitterHandler): void {
  const stream = T.stream('statuses/filter', { track: twitterHandler })

  stream.on('tweet', function (tweet) {
    const asker: string = `@${tweet.user.screen_name}`
    const tweetId = tweet.id_str
    replyTweetWithJoke(asker, tweetId)
  })
}

async function replyTweetWithJoke (asker, tweetId): Promise<void> {
  const randomJoke = await getRandomJoke(140 - asker.length)
  const tweet = `${asker} ${randomJoke}`
  postTweet(tweet, tweetId)
}

export function replyMentions (): void {
  trackMentions('@ChuckieNorrisie')
}
