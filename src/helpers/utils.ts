import Axios from 'axios'

import * as wordfilter from 'wordfilter'
import { JokeResponse } from '../types/joke.type'

const URL_ICNDB = 'http://api.icndb.com/jokes'

function offensiveJoke (word: string): boolean {
  return wordfilter.blacklisted(word) === false
}

function filterJoke (joke: string): boolean {
  return joke.match(/(&quot;)|(\?[^$?])/).length !== 0
}

export function breakName (fullName: string, number: number): string[] {
  return fullName.split(' ', number)
}

export async function getRandomJoke (maxLength: number, firstName?: string, lastName?: string): Promise<string> {
  let url: string = `${URL_ICNDB}/random?exclude=[explicit]`

  if (firstName != null && firstName.length > 0 && lastName != null && lastName.length > 0) {
    url = `${url}&firstName=${firstName}&lastName=${lastName}`
  }

  try {
    const response: JokeResponse = await Axios.get(url)
    const joke = response.value.joke
    if (offensiveJoke(joke) || filterJoke(joke) || joke.length > maxLength) {
      await getRandomJoke(maxLength, firstName, lastName)
    } else {
      return joke
    }
  } catch (error) {
    return error
  }
}
