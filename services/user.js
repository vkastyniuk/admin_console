var logger = require('log4js').getLogger("userService");
var mongo = require('mongoskin');

var db = mongo.db('mongodb://localhost:27017/admin_console');
var users = db.collection('users');

var service = {};
service.findAll = function (page, callback) {
    logger.debug('Call findAll(' + JSON.stringify(page) + ')');
    users.count(function (err, count) {
        if (err) return callback(err, null);
        users.find({}, {
            skip: page.number > 0 ? ((page.number - 1) * page.size) : 0,
            limit: page.size
        }).toArray(function (err, users) {
            if (err) return callback(err, null);
            callback(err, {
                page: page.number,
                size: page.size,
                total: count,
                content: users
            });
        });
    });
};

service.find = function (userName, callback) {
    logger.debug('Call findOne(\"' + userName + '\")');
    users.findOne({userName: userName}, function (err, user) {
        if (!user) {
            var err = new Error('user not found');
            err.status = 404;
            callback(err);
        } else callback(err, user);
    });
};

service.insert = function (user, callback) {
    logger.debug('Call insert(' + JSON.stringify(user) + ')');
    users.insert(user, callback);
};

service.update = function (userName, update, callback) {
    logger.debug('Call update(\"' + userName + '\", ' + JSON.stringify(update) + ')');
    users.update({userName: userName}, update, {}, function (err, rows) {
        if (rows == 0) {
            var err = new Error('user not found');
            err.status = 404;
            callback(err);
        } else callback(err);
    });
};

service.delete = function (userName, callback) {
    logger.debug('Call delete(\"' + userName + '\")');
    users.remove({userName: userName}, function (err, rows) {
        if (rows == 0) {
            var err = new Error('user not found');
            err.status = 404;
            callback(err);
        } else callback(err);
    });
};

module.exports = service;
