let express = require('express');
let app = express();

import { updateTwitter } from './actions/updateTwitter';
import { replyMentions } from './actions/replyMentions';
import { tweetNewFollowers } from './actions/tweetNewFollowers';

app.get('/', function(req, res) {
  res.status(200).json({message:'The twitter bot is working just fine'});
});
app.listen(process.env.PORT || 3000);

/* ACTIONS */
setInterval(function() {
  updateTwitter();
}, 6 * 1000 * 60 * 60);
replyMentions();
tweetNewFollowers();