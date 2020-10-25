import { T } from '../helpers/twitterConnect'
import { postTweet } from '../helpers/twitterActions'
import { breakName, getRandomJoke } from '../helpers/utils'
import { Twitter } from 'twit'

function trackTweets (): void {
  const stream = T.stream('statuses/filter', { track: 'I want to be Chuck Norris' })

  stream.on('tweet', (tweet: Twitter.Status) => {
    const requester: string = `@${tweet.user.screen_name}`
    const name: string[] = breakName(tweet.user.name, 2)
    const tweetId: string = tweet.id_str
    replyTweetWithJoke(requester, name, tweetId).catch((error) => console.log('Failed to reply random tweets', error))
  })
}

async function replyTweetWithJoke (requester: string, name: string[], tweetId: string): Promise<void> {
  const randomJoke: string = await getRandomJoke(140 - requester.length, name[0], name[1])
  const tweet: string = `${requester} ${randomJoke}`
  postTweet(tweet, tweetId)
}

export function replyRandomTweets (): void {
  trackTweets()
}
