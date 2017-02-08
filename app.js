var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./src/routes/index');
var users = require('./src/routes/users');

var compression = require('compression');
var app = express();
app.use(compression({
  // Enable image compression https://github.com/expressjs/compression/issues/82
  // filter: function shouldCompress(req, res) {
  //   if (/^image\//.test(res.getHeader('Content-Type'))) {
  //     // compress any image format
  //     return true;
  //   }
  //   // fallback to standard filter function
  //   return compression.filter(req, res);
  // }
}));

// view engine setup
app.set('views', path.join(__dirname, 'dist/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: 86400000
}));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('../../src/views/error');
});

module.exports = app;
