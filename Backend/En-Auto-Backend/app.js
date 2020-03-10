require('dotenv/config');
require('./models/UserModel');
require('./config/passport');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const passport = require('passport');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// MONGO CONNECTION
mongoose.connect(process.env.MONGO,
    {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("mongo connected")
);


// //connection to DB
// const db = mongoose.connection;
// db.on('error', console.log.bind(console, "connection error"));
//
// db.EnAuto.remove( {_id: 1});
// db.EnAuto.remove( {_id:2});
// db.once('open', function (callback) {
//     console.log("Connection succeeded");
//     //populate the database with 2 users test when starting the app
//     var newUsers = [{_id:1, firstName: 'Victor', lastname: 'Smits', username: 'Totor', password: '123',adresse: "3 rue de la madeleine, tournai 7500"},
//                     {_id:2, firstName: 'Alexandre', lastname: 'Loba', username: 'Alex', password: '456',adresse: "16 rue brederode, bruxelles 1000"},
//                      ];
//
//     User.collection.insert(newUsers, function (err, savedUser) {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             console.log('Database test populated')
//         }
//     })
// });

// Passport init
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({origin: 'http://localhost:4200'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
