let wordfilter = require('wordfilter');

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
  if(joke.match(/(&quot;)/)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  randomNumber: randomNumber,
  offensiveJoke: offensiveJoke,
  filterJoke: filterJoke
};