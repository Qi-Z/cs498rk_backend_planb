var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

app.use(cookieParser())
app.use(bodyParser.json());

var router = express.Router();
var passport = require('passport');
var settings = require('./config/settings');

mongoose.connect(settings.url);
app.use(session({ secret: 'passport' }));

app.use(passport.initialize());
app.use(passport.session());

/**
 * Configure the passport instance by passing it to our passport module and as middleware to our express
 * app instance.
 */
require('./app/backend/auth/passport')(passport);

/**
 * Pass our router and passport to our handler for the route /api/user
 */
app.use('/api', require('./app/backend/routes/route')(router, passport));


app.use(express.static('app/frontend/public'));

var port = process.env.PORT || 4000;
console.log("Express server running on " + port);
app.listen(process.env.PORT || port);