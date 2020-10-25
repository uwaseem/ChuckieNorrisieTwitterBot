import { T } from '../helpers/twitterConnect'
import { postTweet } from '../helpers/twitterActions'

export function tweetNewFollowers (): void {
  const stream = T.stream('user')

  stream.on('follow', (event) => {
    const follower: string = `@${event.source.screen_name}`
    const followingId: string = event.source.id_str
    const tweet: string = `${follower} Chuck Norris does not need Twitter. He is already following you.`
    postTweet(tweet, followingId)
  })
}
