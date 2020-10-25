import { T } from '../helpers/twitterConnect'
import { postTweet } from '../helpers/twitterActions'
import { getRandomJoke } from '../helpers/utils'
import { Twitter } from 'twit'

function trackMentions (twitterHandler): void {
  const stream = T.stream('statuses/filter', { track: twitterHandler })

  stream.on('tweet', (tweet: Twitter.Status): void => {
    const requester: string = `@${tweet.user.screen_name}`
    const tweetId: string = tweet.id_str
    replyTweetWithJoke(requester, tweetId).catch((error) => console.log('Failed to reply mention', error))
  })
}

async function replyTweetWithJoke (requester: string, tweetId: string): Promise<void> {
  const randomJoke: string = await getRandomJoke(140 - requester.length)
  const tweet: string = `${requester} ${randomJoke}`
  postTweet(tweet, tweetId)
}

export function replyMentions (): void {
  trackMentions('@ChuckieNorrisie')
}
