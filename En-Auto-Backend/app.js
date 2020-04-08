require('dotenv/config');
require('./models/UserModel');
require('./models/DevisModel');
require('./models/WaterCostModel');
require('./models/PrecipitationModel');
require('./config/passport');
require('./models/PrecipitationModel');

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
const waterCostRouter  = require('./routes/watercost');
const devRouter = require('./routes/devis');
const mailRouter = require('./routes/mail');
const precipitationRouter = require('./routes/precipitation');

const app = express();

// MONGO CONNECTION
mongoose.connect(process.env.MONGO,
    {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("mongo connected")
);

// Passport init
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({origin: process.env.ORIGIN}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/devis', devRouter);
app.use('/watercost', waterCostRouter);
app.use('/mail', mailRouter);
app.use('/precipitation', precipitationRouter);

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
