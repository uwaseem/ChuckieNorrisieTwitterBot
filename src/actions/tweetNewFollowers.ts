import { T } from '../helpers/twitterConnect'
import { postTweet } from '../helpers/twitterActions'

export function tweetNewFollowers () {
  const stream = T.stream('user')

  stream.on('follow', function (event) {
    const follower = `@${event.source.screen_name}`
    const followingId = event.source.id_str
    const tweet = `${follower} Chuck Norris does not need Twitter. He is already following you.`
    postTweet(tweet, followingId)
  })
}
