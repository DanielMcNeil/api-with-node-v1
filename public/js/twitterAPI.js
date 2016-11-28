'use strict';

// use local environmental variable file when running on a local machine
try {
  require('./env.js');
} catch(error) {
  // no env file in production environment
}

// npm module that connects to the Twitter API
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

// get timeline data
// deasync will prevent to function from completing until tweet data has returned from the server
const getTweets = () => {
  let data;
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (tweets) {
      data = tweets;
    } else if (error) {
      console.log(error);
    }
  });
  while(data === undefined) {
    require('deasync').runLoopOnce();
  }
  return data;
};

// get friends list data
const getFriends = () => {
  let data;
  client.get('friends/list', params, function(error, friends, response) {
    if (friends) {
      data = friends;
    } else if (error) {
      console.log(error);
    }
  });
  while(data === undefined) {
    require('deasync').runLoopOnce();
  }
  return data;
};

// get direct message data
const getMessages = () => {
  let data;
  client.get('direct_messages', params, function(error, messages, response) {
    if (messages) {
      data = messages;
    } else if (error) {
      console.log(error);
    }
  });
  while(data === undefined) {
    require('deasync').runLoopOnce();
  }
  return data;
};

// post tweets
// deasync will prevent the function from completing until a response is received from the server
const postTweet = (tweet) => {
  let data;
  client.post('statuses/update', {status: tweet}, function(error, messages, response) {
    if (response) {
      data = response;
    } else if (messages) {
      console.dir(messages);
    } else if (error) {
      console.log(error);
    }
  });
  while(data === undefined) {
    require('deasync').runLoopOnce();
  }
};

// export functions to app.js
module.exports = {
  tweets: getTweets,
  friends: getFriends,
  messages: getMessages,
  postTweet: postTweet
};