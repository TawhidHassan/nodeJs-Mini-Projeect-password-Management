var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')


var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var addnewcategoryRouter = require('./routes/add-new-category');
var passwordCategoryRouter = require('./routes/passwordCategory');
var addnewpasswordRouter = require('./routes/add-new-password');
var viewallpasswordRouter = require('./routes/view-all-password');
var passworddetailRouter = require('./routes/password-detail');
var joinRouter = require('./routes/join');
var usersRouter = require('./routes/users');

//api
var PassCatApi = require('./api/add-category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'sifat',
  resave: false,
  saveUninitialized: true,
}));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/add-new-category', addnewcategoryRouter);
app.use('/passwordCategory', passwordCategoryRouter);
app.use('/add-new-password', addnewpasswordRouter);
app.use('/view-all-password', viewallpasswordRouter);
app.use('/password-detail', passworddetailRouter);
app.use('/joinResult', joinRouter);
app.use('/users', usersRouter);


//api
app.use('/api', PassCatApi);

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
  // res.render('error');
   res.status(404).json(
    { error:"PAge not found"}
   );
   res.status(505).json(
    { error:"internal server error "}
   );
});

module.exports = app;
