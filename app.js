'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const twitter = require('./public/js/twitterAPI.js');

// use body-parser to parse the request data from the ajax request in frontend.js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve static files in the public directory
app.use(express.static(__dirname + '/public'));

// pug template engine (formerly Jade)
app.set('view engine','pug');
app.set('views', __dirname + '/views');

// routing
// get timeline, friends list, and direct message data from the twitterAPI
app.get('/', function(req, res, next) {
  req.tweetList = twitter.tweets();
  req.friendsList = twitter.friends();
  req.messageList = twitter.messages();
  next();
}, function(req,res) {
  res.render('index',{tweets: req.tweetList, friends: req.friendsList.users, messages: req.messageList});
});

// post tweets with the twitterAPI and return an updated timeline
app.post('/tweets', function(req,res,next) {
  console.log(req.body);
  twitter.postTweet(req.body.tweetText);
  next();
}, function(req,res,next) {
  req.tweetList = twitter.tweets();
  next();
}, function(req,res) {
  res.json(req.tweetList);
});

// error pages
app.use(function (req, res, next) {
  res.status(404).render('error',{status: '404', text1: 'Oh hai!  Sorry I couldn\'t find that page that you were looking for.', text2: 'But if you want to click the back button and try something else that\'s cool too.'});
});

app.use(function (err, req, res, next) {
  res.status(500).render('error',{status: '500', text1: 'Uh oh.  It looks like something went wrong.  Just wait a couple minutes and try again.', text2: 'If you keep ending up back here, please tell the website owner about it.'});
});

// server
app.listen(port, function() {
  console.log('frontend server is running on port ' + port);
});