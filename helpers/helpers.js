let wordfilter = require('wordfilter');
let request = require('request');

const URL_ICNDB = 'http://api.icndb.com/jokes';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function offensiveJoke(word) {
  if(!wordfilter.blacklisted(word)) {
    return false;
  } else {
    return true;
  }
}

function filterJoke(joke) {
  if(joke.match(/(&quot;)|(\?[^$\?])/)) {
    return true;
  } else {
    return false;
  }
}

function getRandomJoke(maxLength) {
  let url = `${URL_ICNDB}/random?exclude=[explicit]`;

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
        getRandomJoke(maxLength);
      } else {
        resolve(value.joke);
      }
    });
  });
}

module.exports = {
  randomNumber: randomNumber,
  offensiveJoke: offensiveJoke,
  filterJoke: filterJoke,
  getRandomJoke: getRandomJoke
};