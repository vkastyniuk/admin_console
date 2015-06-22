var express = require('express');
var userService = require('../services/user');

var router = express.Router();
router.get('/', function (req, res, next) {
    userService.findAll(req.page, req.query.criteria, function (err, page) {
        if (err) next(err);
        else res.status(200).json(page);
    });
});

router.post('/', function (req, res, next) {
    userService.insert(req.body, function (err, user) {
        if (err) next(err);
        else res.status(200).json(user);
    });
});

router.get('/:userName', function (req, res, next) {
    userService.find(req.params.userName.toLowerCase(), function (err, user) {
        if (err) next(err);
        else res.status(200).json(user);
    });
});

router.put('/:userName', function (req, res, next) {
    userService.update(req.params.userName.toLowerCase(), req.body, function (err, user) {
        if (err) next(err);
        else res.status(200).json(user);
    });
});

router.delete('/:userName', function (req, res, next) {
    userService.remove(req.params.userName.toLowerCase(), function (err) {
        if (err) next(err);
        else res.status(204).end();
    });
});

module.exports = router;
