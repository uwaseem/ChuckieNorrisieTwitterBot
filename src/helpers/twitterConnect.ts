import * as Twit from 'twit'

const API_KEY = process.env.TWITTER_API_KEY
const API_SECRET = process.env.TWITTER_API_SECRET
const ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
const ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET

export const T = new Twit({
  consumer_key: API_KEY,
  consumer_secret: API_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
})
