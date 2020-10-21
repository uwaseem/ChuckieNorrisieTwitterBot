import { T } from './twitterConnect'

export function postTweet (tweet: string, tweetId?: string): any {
  T.post('statuses/update', { status: tweet, in_reply_to_status_id: tweetId }, (err) => {
    if (err) {
      console.log('Failed to post tweet', err)
      return err
    }
  })
}
