var express = require('express');
var router = express.Router();
var groupService = require('../services/group');

router.get('/', function (req, res, next) {
    groupService.findAll(req.page, function (err, page) {
        if (err) next(err);
        else res.status(200).json(page);
    });
});

router.post('/', function (req, res, next) {
    // TODO: validate request body
    groupService.insert(req.body, function (err, group) {
        if (err) next(err);
        else res.status(200).json(group);
    });
});

router.get('/:groupName', function (req, res, next) {
    groupService.find(req.params.groupName, function (err, group) {
        if (err) next(err);
        else res.status(200).json(group);
    });
});

router.put('/:groupName', function (req, res, next) {
    // TODO: validate request param 'groupName'
    groupService.update(req.params.groupName, req.body, function (err) {
        if (err) next(err);
        else res.status(204).end();
    });
});

router.delete('/:groupName', function (req, res, next) {
    // TODO: validate request param 'groupName'
    groupService.delete(req.params.groupName, function (err) {
        if (err) next(err);
        else res.status(204).end();
    });
});

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

module.exports = router;
