'use strict';

try {
  require('./env.js');
} catch(error) {
  // no env file in production environment
}

const Twitter = require('twitter');
 
const client = new Twitter({
  consumer_key: process.env.KEY,
  consumer_secret: process.env.SECRET,
  access_token_key: process.env.TOKEN,
  access_token_secret: process.env.TOKENSECRET
});
 
const params = {
  screen_name: 'SmellyDogCoding',
  count: 5
};

const getTweets = () => {
  var data;
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (tweets) {
      data = tweets;
    } else if (error) {
      console.log(error);
    }
  });
  while(data === undefined) {
    require('deasync').runLoopOnce();
  };
  return data;
};

const getFriends = () => {
  var data;
  client.get('friends/list', params, function(error, friends, response) {
    if (friends) {
      data = friends;
    } else if (error) {
      console.log(error);
    }
  });
  while(data === undefined) {
    require('deasync').runLoopOnce();
  };
  return data;
};

const getMessages = () => {
  var data;
  client.get('direct_messages', params, function(error, messages, response) {
    if (messages) {
      data = messages;
    } else if (error) {
      console.log(error);
    }
  });
  while(data === undefined) {
    require('deasync').runLoopOnce();
  };
  return data;
};

const postTweet = (tweet) => {
  client.post('statuses/update', {status: tweet}, function(error, messages, response) {
    if (messages) {
      console.log(messages);
    } else if (error) {
      console.log(error);
    }
  });
}

module.exports = {
  tweets: getTweets,
  friends: getFriends,
  messages: getMessages,
  postTweet: postTweet
};