import { T } from '../helpers/twitterConnect'
import { postTweet } from '../helpers/twitterActions'
import { breakName, getRandomJoke } from '../helpers/utils'

function trackTweets (): void {
  const stream = T.stream('statuses/filter', { track: 'I want to be Chuck Norris' })

  stream.on('tweet', (tweet) => {
    const asker: string = `@${tweet.user.screen_name}`
    const name: string[] = breakName(tweet.user.name, 2)
    const tweetId: string = tweet.id_str
    replyTweetWithJoke(asker, name, tweetId)
  })
}

async function replyTweetWithJoke (asker: string, name: string[], tweetId: string): Promise<void> {
  const randomJoke: string = await getRandomJoke(140 - asker.length, name[0], name[1])
  const tweet: string = `${asker} ${randomJoke}`
  postTweet(tweet, tweetId)
}

export function replyRandomTweets (): void {
  trackTweets()
}
