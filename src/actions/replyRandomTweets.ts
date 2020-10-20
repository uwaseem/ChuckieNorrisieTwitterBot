import { T } from '../helpers/twitterConnect'
import { postTweet } from '../helpers/twitterActions'
import { breakName, getRandomJoke } from '../helpers/utils'

function trackTweets () {
  const stream = T.stream('statuses/filter', { track: 'I want to be Chuck Norris' })

  stream.on('tweet', function (tweet) {
    const asker = `@${tweet.user.screen_name}`
    const name = breakName(tweet.user.name, 2)
    const tweetId = tweet.id_str
    replyTweetWithJoke(asker, name, tweetId)
  })
}

async function replyTweetWithJoke (asker, name, tweetId) {
  const randomJoke = await getRandomJoke(140 - asker.length, name[0], name[1])
  const tweet = `${asker} ${randomJoke}`
  postTweet(tweet, tweetId)
}

export function replyRandomTweets () {
  trackTweets()
}
