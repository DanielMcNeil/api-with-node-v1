'use strict';

try {
  require('./env.js');
} catch(error) {
  // no env file in production environment
}

var express = require('express');
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.KEY,
  consumer_secret: process.env.SECRET,
  access_token_key: process.env.TOKEN,
  access_token_secret: process.env.TOKENSECRET
});
 
var params = {screen_name: 'SmellyDogCoding',count: 5};
var tweetList;
var friendList;
var myDMs;
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (tweets) {
    tweetList = tweets;
  } else if (error) {
    console.log(error);
  }
});

var friends = client.get('friends/list', params, function(error, friends, response) {
  if (friends) {
    friendList = friends;
  } else if (error) {
    console.log(error);
  }
});

var dms = client.get('direct_messages', params, function(error, dms, response) {
  if (dms) {
    myDMs = dms;
  } else if (error) {
    console.log(error);
  }
});

// // load environmental variables when working in local enviroment
try {
  require('./env.js');
} catch(error) {
  // no env file in production environment
}

var app = express();

// serve static files in the public directory
app.use(express.static(__dirname + '/public'));

// jade template engine
app.set('view engine','pug');
app.set('views', __dirname + '/views');

// routing
app.get('/', function(request, response) {
  console.dir(friendList.users);
  response.render('index',{tweets: tweetList, friends: friendList.users});
});

// server
app.listen(process.env.PORT, function() {
  console.log('frontend server is running on port ' + process.env.PORT);
});