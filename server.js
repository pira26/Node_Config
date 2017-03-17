const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');

const app = express();

// connect to our local database called data
mongoose.connect("mongodb://localhost:27017/data");

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'hbs');

// logs all requests
app.use(logger('dev'));

// tell the app to parse HTTP body messages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// tell the app to look for static files in these directories
app.use(express.static(path.join(__dirname, '/server/public')));

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});

// start the server
app.listen(8080, () => {
	console.log('Connect to localhost:8080');
});

module.exports = app;