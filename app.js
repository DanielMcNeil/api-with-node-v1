'use strict';

var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

// load environmental variables when working in local enviroment
try {
  require('./env.js');
} catch(error) {
  // no env file in production environment
}

var port = process.env.PORT;

passport.use(new Strategy({
    consumerKey: process.env.KEY,
    consumerSecret: process.env.SECRET,
    callbackURL: process.env.CALLBACKURL
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
}));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var app = express();

// serve static files in the public directory
app.use(express.static(__dirname + '/public'));

// jade template engine
app.set('view engine','jade');
app.set('views', __dirname + '/views');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// routing
app.get('/', function(request, response) {
  response.render('index',{user: request.user});
});

app.get('/login/twitter',passport.authenticate('twitter'));

app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(request,response) {
    response.redirect('/')
  }
);

// server
app.listen(port, function() {
  console.log('frontend server is running on port ' + port);
});