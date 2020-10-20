import { T } from './twitterConnect'

export function postTweet (tweet, tweetId?) {
  T.post('statuses/update', { status: tweet, in_reply_to_status_id: tweetId }, function (err, data, response) {
    if (err) {
      console.log('Failed to post tweet', err)
      return err
    }
  })
}

export function postTweetMedia (tweet, media) {
  T.post('media/upload', { media_date: media }, function (err, data, response) {
    if (err) {
      console.log('Failed to post tweet with media ', err)
      return err
    }
    const mediaId = data.media_id_string
    const fullTweet = { status: tweet, media_ids: [mediaId] }

    postTweet(fullTweet)
  })
}
