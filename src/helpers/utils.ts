import * as request from 'request'
import * as wordfilter from 'wordfilter'

const URL_ICNDB = 'http://api.icndb.com/jokes'

export function randomNumber (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function breakName (fullName: string, number: number): string[] {
  return fullName.split(' ', number)
}

export function offensiveJoke (word: string): boolean {
  return !(!wordfilter.blacklisted(word))
}

export function filterJoke (joke): boolean {
  return !!(joke.match(/(&quot;)|(\?[^$\?])/))
}

export function getRandomJoke (maxLength: number, firstName?: string, lastName?: string): Promise<string> {
  let url: string = `${URL_ICNDB}/random?exclude=[explicit]`

  if (firstName && lastName) {
    url = `${url}&firstName=${firstName}&lastName=${lastName}`
  }

  return new Promise(function (resolve) {
    request({
      url,
      method: 'GET'
    }, (err, res) => {
      if (err) {
        return err
      }
      const { value } = JSON.parse(res.body)

      if (offensiveJoke(value.joke) || filterJoke(value.joke) || value.joke.length > maxLength) {
        getRandomJoke(maxLength, firstName, lastName)
      } else {
        resolve(value.joke)
      }
    })
  })
}
