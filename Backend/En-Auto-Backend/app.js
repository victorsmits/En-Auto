require('dotenv/config');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// MONGO CONNECTION
mongoose.connect(process.env.MONGO,
    {useNewUrlParser: true,useUnifiedTopology:true}, () =>
        console.log("mongo seem connected")
);
//connection to DB 
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.EnAuto.remove( {_id: 1});
db.EnAuto.remove( {_id:2});
db.once('open', function (callback) {
    console.log("Connection succeeded");
    //populate the database with 2 users test when starting the app
    var newUsers = [{_id:1, firstName: 'Victor', lastname: 'Smits', username: 'Totor', password: '123',adresse: "3 rue de la madeleine, tournai 7500"},
                    {_id:2, firstName: 'Alexandre', lastname: 'Loba', username: 'Alex', password: '456',adresse: "16 rue brederode, bruxelles 1000"},
                     ];

    User.collection.insert(newUsers, function (err, savedUser) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Database test populated')
        }
    })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
