var express = require('express');
var router = express.Router();
var userService = require('../services/user');

router.get('/', function (req, res, next) {
    userService.findAll(req.page, function (err, page) {
        if (err) next(err);
        else res.status(200).json(page);
    });
});

router.post('/', function (req, res, next) {
    // TODO: validate request body
    userService.insert(req.body, function (err, user) {
        if (err) next(err);
        else res.status(200).json(user);
    });
});

router.get('/:userName', function (req, res, next) {
    userService.find(req.params.userName, function (err, user) {
        if (err) next(err);
        else res.status(200).json(user);
    });
});

router.put('/:userName', function (req, res, next) {
    // TODO: validate request param 'userName'
    userService.update(req.params.userName, req.body, function (err) {
        if (err) next(err);
        else res.status(204).end();
    });
});

router.delete('/:userName', function (req, res, next) {
    // TODO: validate request param 'userName'
    userService.delete(req.params.userName, function (err) {
        if (err) next(err);
        else res.status(204).end();
    });
});

module.exports = router;
