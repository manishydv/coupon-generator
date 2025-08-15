const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { checkLogsAndSendEmail } = require('./utils/cron');

const rtsIndex = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", rtsIndex);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'uploads')));

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});


// Start the cron job
checkLogsAndSendEmail();