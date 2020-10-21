import Axios from 'axios'

import * as wordfilter from 'wordfilter'

const URL_ICNDB = 'http://api.icndb.com/jokes'

function offensiveJoke (word: string): boolean {
  return !(!wordfilter.blacklisted(word))
}

function filterJoke (joke): boolean {
  return !!(joke.match(/(&quot;)|(\?[^$\?])/))
}

export function breakName (fullName: string, number: number): string[] {
  return fullName.split(' ', number)
}

export async function getRandomJoke (maxLength: number, firstName?: string, lastName?: string): Promise<string> {
  let url: string = `${URL_ICNDB}/random?exclude=[explicit]`

  if (firstName && lastName) {
    url = `${url}&firstName=${firstName}&lastName=${lastName}`
  }

  try {
    const { data: { value: { joke } } } = await Axios.get(url)

    if (offensiveJoke(joke) || filterJoke(joke) || joke.length > maxLength) {
      getRandomJoke(maxLength, firstName, lastName)
    } else {
      return joke
    }
  } catch (error) {
    return error
  }
}
