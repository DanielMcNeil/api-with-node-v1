'use strict';

var express = require('express');
var app = express();

// serve static files in the public directory
app.use(express.static(__dirname + '/public'));

// jade template engine
app.set('view engine','jade');
app.set('views', __dirname + '/views');

// routing
app.get('/', function(request, response) {
  response.render('index',{title: 'Home Page'});
});

// server
app.listen(3000, function() {
  console.log('frontend server is running on port 3000');
});