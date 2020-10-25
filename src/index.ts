import express, { Express, Request, Response } from 'express'

import { getRandomJoke } from './helpers/utils'
/* import { replyMentions } from './actions/replyMentions'
import { replyRandomTweets } from './actions/replyRandomTweets'
import { tweetNewFollowers } from './actions/tweetNewFollowers'
import { updateTwitter } from './actions/updateTwitter' */

const app: Express = express()

app.listen(process.env.PORT || 3000)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'The twitter bot is working just fine' })
})

app.get('/joke', (req: Request, res: Response) => {
  res.status(200).json({ message: getRandomJoke(300) })
})

/* ACTIONS */
/* setInterval(() => { updateTwitter() }, 6 * 1000 * 60 * 60)
replyMentions()
tweetNewFollowers()
replyRandomTweets() */
