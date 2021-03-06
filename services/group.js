var logger = require('log4js').getLogger("groupService");
var UserModel = require('../models/user').UserModel;
var GroupModel = require('../models/group').GroupModel;

var service = {};
service.findAll = function (page, criteria, callback) {
    logger.debug('Call findAll(' + JSON.stringify(page) + ')');
    GroupModel.count(function (err, count) {
        if (err) return callback(err, null);

        var conditions = {};
        if (criteria) {
            var regexp = new RegExp(criteria, "i");
            conditions = {$or: [{name: regexp}, {title: regexp}]};
        }

        GroupModel.find(conditions, {}, {
            skip: page.number > 0 ? ((page.number - 1) * page.size) : 0,
            limit: page.size
        })
            .select('-_id -__v')
            .exec(function (err, groups) {
                callback(err, {
                    page: page.number,
                    size: page.size,
                    total: count,
                    content: groups
                });
            });
    });
};

service.find = function (groupName, callback) {
    logger.debug('Call findOne(\"' + groupName + '\")');
    GroupModel.findOne({name: groupName})
        .select('-_id -__v')
        .exec(function (err, group) {
            if (!group) {
                var err = new Error('not found');
                err.status = 404;
                callback(err);
            } else callback(err, group);
        });
};

service.insert = function (group, callback) {
    logger.debug('Call insert(' + JSON.stringify(group) + ')');
    var groupModel = new GroupModel({
        name: group.name,
        title: group.title
    });

    groupModel.save(function (err) {
        if (!err) {
            logger.info("group created");
            return callback(null, group);
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

service.update = function (groupName, update, callback) {
    logger.debug('Call update(\"' + groupName + '\", ' + JSON.stringify(update) + ')');
    GroupModel.findOne({name: groupName}, function (err, group) {
        if (!group) {
            var err = new Error('not found');
            err.status = 404;
            return callback(err);
        }

        group.name = update.name;
        group.title = update.title;
        group.save(function (err) {
            if (!err) {
                logger.info("group updated");
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

service.remove = function (groupName, callback) {
    logger.debug('Call remove(\"' + groupName + '\")');
    GroupModel.findOne({name: groupName}, function (err, group) {
        if (!group) {
            var err = new Error('not found');
            err.status = 404;
            return callback(err);
        }

        group.remove(function (err) {
            if (err) {
                return callback(err);
            }

            UserModel.update({groups: group._id}, {'$pull': {groups: group._id}}, callback);
        });
    });
};

service.findGroupUsers = function (page, groupName, criteria, callback) {
    logger.debug('Call findGroupUsers(' + JSON.stringify(page) + ', \"' + groupName + '\")');
    GroupModel.findOne({name: groupName}, function (err, group) {
        if (!group) {
            var err = new Error('not found');
            err.status = 404;
            return callback(err);
        }

        UserModel.count({groups: group._id}, function (err, count) {
            if (err) return callback(err, null);

            var conditions = {};
            if (criteria) {
                var regexp = new RegExp(criteria, "i");
                conditions = {$and: [{groups: group._id}, {$or: [{userName: regexp}, {firstName: regexp}, {lastName: regexp}, {email: regexp}]}]};
            } else {
                conditions = {groups: group._id}
            }

            UserModel.find(conditions, {}, {
                skip: page.number > 0 ? ((page.number - 1) * page.size) : 0,
                limit: page.size
            })
                .select('-groups -_id -__v')
                .exec(function (err, groups) {
                    callback(err, {
                        page: page.number,
                        size: page.size,
                        total: count,
                        content: groups
                    });
                });
        });
    });
};

service.addGroupUser = function (groupName, userName, callback) {
    logger.debug('Call addGroupUser(\"' + groupName + '\", \"' + userName + '\")');
    GroupModel.findOne({name: groupName}, function (err, group) {
        if (!group) {
            var err = new Error('not found');
            err.status = 404;
            return callback(err);
        }

        UserModel.findOne({userName: userName}, function (err, user) {
            if (!user) {
                var err = new Error('not found');
                err.status = 404;
                return callback(err);
            }

            UserModel.findByIdAndUpdate(user._id, {'$addToSet': {groups: group._id}}, callback);
        });
    });
};

service.removeGroupUser = function (groupName, userName, callback) {
    logger.debug('Call removeGroupUser(\"' + groupName + '\", \"' + userName + '\")');
    GroupModel.findOne({name: groupName}, function (err, group) {
        if (!group) {
            var err = new Error('not found');
            err.status = 404;
            return callback(err);
        }

        UserModel.findOne({userName: userName}, function (err, user) {
            if (!user) {
                var err = new Error('not found');
                err.status = 404;
                return callback(err);
            }

            UserModel.findByIdAndUpdate(user._id, {'$pull': {groups: group._id}}, callback);
        });
    });
};

module.exports = service;
