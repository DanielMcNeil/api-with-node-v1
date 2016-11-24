'use strict';

const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
const twitter = require('./public/js/twitter.js');

// serve static files in the public directory
app.use(express.static(__dirname + '/public'));

// jade template engine
app.set('view engine','pug');
app.set('views', __dirname + '/views');

// routing
app.get('/', function(req, res, next) {
  req.tweetList = twitter.tweets();
  req.friendsList = twitter.friends();
  req.messageList = twitter.messages();
  next();
}, function(req,res) {
  res.render('index',{tweets: req.tweetList, friends: req.friendsList.users, messages: req.messageList});
});

app.get('/post/:tweet', function(req,res,next) {
  twitter.postTweet(req.params.tweet);
  next();
}, function(req,res,next) {
  req.tweetList = twitter.tweets();
  next();
}, function(req,res) {
  res.json(req.tweetList)
});

// server
app.listen(port, function() {
  console.log('frontend server is running on port ' + port);
});