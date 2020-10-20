import * as express from 'express'
import { Express } from 'express'

import { updateTwitter } from './actions/updateTwitter'
import { replyMentions } from './actions/replyMentions'
import { tweetNewFollowers } from './actions/tweetNewFollowers'
import { replyRandomTweets } from './actions/replyRandomTweets'

const app: Express = express()

app.listen(process.env.PORT || 3000)

app.get('/', function (req, res) {
  res.status(200).json({ message: 'The twitter bot is working just fine' })
})

/* ACTIONS */
setInterval(() => { updateTwitter() }, 6 * 1000 * 60 * 60)
replyMentions()
tweetNewFollowers()
replyRandomTweets()
