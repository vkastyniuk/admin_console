var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;
exports.UserModel = mongoose.model('User',
    new mongoose.Schema({
        userName: {
            type: String,
            required: true,
            min: 4,
            max: 20,
            match: /^([\w\d-\.]*)?$/
        },
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 20,
            match: /^([\w -]*)?$/
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 20,
            match: /^([\w]*)?$/
        },
        email: {
            type: String,
            required: true,
            min: 3,
            max: 30,
            match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        },
        groups: [ObjectId]
    }), 'users');
