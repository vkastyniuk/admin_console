var logger = require('log4js').getLogger("userService");
var UserModel = require('../model/user').UserModel;

var service = {};
service.findAll = function (page, callback) {
    logger.debug('Call findAll(' + JSON.stringify(page) + ')');
    UserModel.count(function (err, count) {
        if (err) return callback(err, null);
        UserModel.find({}, {}, {
            skip: page.number > 0 ? ((page.number - 1) * page.size) : 0,
            limit: page.size
        })
            .select('-groups -_id -__v')
            .exec(function (err, users) {
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
    UserModel.findOne({userName: userName})
        .select('-groups -_id -__v')
        .exec(function (err, user) {
            if (!user) {
                var err = new Error('not found');
                err.status = 404;
                callback(err);
            } else callback(err, user);
        });
};

service.insert = function (user, callback) {
    logger.debug('Call insert(' + JSON.stringify(user) + ')');
    var userModel = new UserModel({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });

    userModel.save(function (err) {
        if (!err) {
            logger.info("user created");
            return callback(null, user);
        } else {
            if (err.name == 'ValidationError') {
                var err = new Error('validation error');
                err.status = 400;
                callback(err);
            }
            if (err.code == 11000) {
                var err = new Error('already exists');
                err.status = 409;
                callback(err);
            } else {
                callback(err);
            }
        }
    });
};

service.update = function (userName, update, callback) {
    logger.debug('Call update(\"' + userName + '\", ' + JSON.stringify(update) + ')');
    UserModel.findOne({userName: userName}, function (err, user) {
        if (!user) {
            var err = new Error('not found');
            err.status = 404;
            return callback(err);
        }

        user.userName = update.userName;
        user.firstName = update.firstName;
        user.lastName = update.lastName;
        user.email = update.email;
        user.save(function (err) {
            if (!err) {
                logger.info("user updated");
                return callback(null, update);
            } else {
                if (err.name == 'ValidationError') {
                    var err = new Error('validation error');
                    err.status = 400;
                    callback(err);
                } else {
                    callback(err);
                }
            }
        });
    });
};

service.remove = function (userName, callback) {
    logger.debug('Call remove(\"' + userName + '\")');
    UserModel.findOne({userName: userName}, function (err, user) {
        if (!user) {
            var err = new Error('not found');
            err.status = 404;
            return callback(err);
        }

        user.remove(function (err) {
            if (!err) {
                logger.info("user removed");
            }
            return callback(err);
        });
    });
};

module.exports = service;
