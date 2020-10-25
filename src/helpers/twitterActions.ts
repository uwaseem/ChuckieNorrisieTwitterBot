import { T } from './twitterConnect'

export function postTweet (tweet: string, tweetId?: string): void {
  T.post('statuses/update', { status: tweet, in_reply_to_status_id: tweetId }, (error) => {
    console.log('Failed to post tweet', error)
    return error
  })
}
