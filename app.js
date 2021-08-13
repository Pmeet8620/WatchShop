var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var modelsRouter = require('./routes/models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/models', modelsRouter);

const connectionString = 'mongodb+srv://Meet_123:2ssq9NzNcFFM723x@cluster0.edjfz.mongodb.net/comp2068'; 
mongoose.connect(connectionString, {useNewUrlParser: true , useUnifiedTopology: true})
.then((message) => {
console.log('Connected Successfully!');
})
.catch((err) => {
  console.log(err);
});

const hbs = require('hbs');

hbs.registerHelper('createOption', (currentValue, selectedValue) => {
var selectedAttribute = '';
if (currentValue ==  selectedValue){
  selectedAttribute = 'selected'
}
return new hbs.SafeString("<option "+ selectedAttribute +">" + currentValue + "</option>");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
