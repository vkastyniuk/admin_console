var express = require('express');
var logger = require('log4js').getLogger("app");
var morgan = require('morgan');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var groups = require('./routes/groups');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

// catch pagination parameters
app.use(function (req, res, next) {
    req.page = {};
    req.page.number = parseInt(req.query.page) | 1;
    req.page.size = parseInt(req.query.size) | 20;
    next();
});

app.use('/groups', groups);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    logger.error(err.stack);
    var status = err.status || 500;
    res.status(status);
    res.json({code: status, message: err.message});
});

module.exports = app;
