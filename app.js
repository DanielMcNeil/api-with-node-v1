'use strict';

var express = require('express');
var app = express();

try {
  require('./env.js');
} catch(error) {
  // no env file in production environment
}

var port = process.env.PORT;

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
app.listen(port, function() {
  console.log('frontend server is running on port ' + port);
});