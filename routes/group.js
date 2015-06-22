var express = require('express');
var groupService = require('../services/group');

var router = express.Router();
router.get('/', function (req, res, next) {
    groupService.findAll(req.page, req.query.criteria, function (err, page) {
        if (err) next(err);
        else res.status(200).json(page);
    });
});

router.post('/', function (req, res, next) {
    groupService.insert(req.body, function (err, group) {
        if (err) next(err);
        else res.status(200).json(group);
    });
});

router.get('/:groupName', function (req, res, next) {
    groupService.find(req.params.groupName.toLowerCase(), function (err, group) {
        if (err) next(err);
        else res.status(200).json(group);
    });
});

router.put('/:groupName', function (req, res, next) {
    groupService.update(req.params.groupName.toLowerCase(), req.body, function (err, group) {
        if (err) next(err);
        else res.status(200).json(group);
    });
});

router.delete('/:groupName', function (req, res, next) {
    groupService.remove(req.params.groupName.toLowerCase(), function (err) {
        if (err) next(err);
        else res.status(204).end();
    });
});

router.get('/:groupName/users', function (req, res, next) {
    groupService.findGroupUsers(req.page, req.params.groupName.toLowerCase(), req.query.criteria, function (err, page) {
        if (err) next(err);
        else res.status(200).json(page);
    });
});

router.post('/:groupName/users/:userName', function (req, res, next) {
    groupService.addGroupUser(req.params.groupName.toLowerCase(), req.params.userName.toLowerCase(), function (err) {
        if (err) next(err);
        else res.status(204).end();
    });
});

router.delete('/:groupName/users/:userName', function (req, res, next) {
    groupService.removeGroupUser(req.params.groupName.toLowerCase(), req.params.userName.toLowerCase(), function (err) {
        if (err) next(err);
        else res.status(204).end();
    });
});

module.exports = router;
