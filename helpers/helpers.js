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

module.exports = {
  randomNumber: randomNumber,
  offensiveJoke: offensiveJoke
};