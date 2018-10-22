import * as wordfilter from 'wordfilter'
let request = require('request');

const URL_ICNDB = 'http://api.icndb.com/jokes';

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function breakName(fullName, number) {
  let name = fullName.split(" ", number);
  return name;
}

export function offensiveJoke(word) {
  if(!wordfilter.blacklisted(word)) {
    return false;
  } else {
    return true;
  }
}

export function filterJoke(joke) {
  if(joke.match(/(&quot;)|(\?[^$\?])/)) {
    return true;
  } else {
    return false;
  }
}

export function getRandomJoke(maxLength, firstName?, lastName?) {
  let url = `${URL_ICNDB}/random?exclude=[explicit]`;
  firstName = firstName || false;
  lastName = lastName || false;

  if(firstName && lastName) {
    url = `${url}&firstName=${firstName}&lastName=${lastName}`;
  }

  return new Promise(function(resolve, reject) {
    request({
      url: url,
      method: 'GET'
    }, function(err, res) {
      if(err) {
        return err;
      }
      let { value } = JSON.parse(res.body);

      if(offensiveJoke(value.joke) || filterJoke(value.joke) || value.joke.length > maxLength) {
        getRandomJoke(maxLength, firstName , lastName);
      } else {
        resolve(value.joke);
      }
    });
  });
}
