var logger = require('log4js').getLogger("groupService");
var mongo = require('mongoskin');

var db = mongo.db('mongodb://localhost:27017/admin_console');
var groups = db.collection('groups');

var service = {};
service.findAll = function (page, callback) {
    logger.debug('Call findAll(' + JSON.stringify(page) + ')');
    groups.count(function (err, count) {
        if (err) return callback(err, null);
        groups.find({}, {
            skip: page.number > 0 ? ((page.number - 1) * page.size) : 0,
            limit: page.size
        }).toArray(function (err, groups) {
            if (err) return callback(err, null);
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
    groups.findOne({groupName: groupName}, function (err, group) {
        if (!group) {
            var err = new Error('group not found');
            err.status = 404;
            callback(err);
        } else callback(err, group);
    });
};

service.insert = function (group, callback) {
    logger.debug('Call insert(' + JSON.stringify(group) + ')');
    groups.insert(group, callback);
};

service.update = function (groupName, update, callback) {
    logger.debug('Call update(\"' + groupName + '\", ' + JSON.stringify(update) + ')');
    groups.update({groupName: groupName}, update, {}, function (err, rows) {
        if (rows == 0) {
            var err = new Error('group not found');
            err.status = 404;
            callback(err);
        } else callback(err);
    });
};

service.delete = function (groupName, callback) {
    logger.debug('Call delete(\"' + groupName + '\")');
    groups.remove({groupName: groupName}, function (err, rows) {
        if (rows == 0) {
            var err = new Error('group not found');
            err.status = 404;
            callback(err);
        } else callback(err);
    });
};

/*

 router.get('/:groupName/users', function (req, res, next) {
 // TODO: validate request params 'groupName'
 groupService.findGroupUsers(req.page, req.params.groupName, function (err, page) {
 if (err) next(err);
 else res.status(200).json(page);
 });
 });

 router.post('/:groupName/users/:userName', function (req, res, next) {
 // TODO: validate request params 'groupName', 'userName'
 groupService.addGroupUser(req.params.groupName, req.params.userName, function (err) {
 if (err) next(err);
 else res.status(204).end();
 });
 });

 router.delete('/:groupName/users/:userName', function (req, res, next) {
 // TODO: validate request params 'groupName', 'userName'
 groupService.removeGroupUser(req.params.groupName, req.params.userName, function (err) {
 if (err) next(err);
 else res.status(204).end();
 });
 });

 */

module.exports = service;
