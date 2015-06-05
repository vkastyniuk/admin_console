var mongoose = require('mongoose');

exports.GroupModel = mongoose.model('Group',
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            min: 4,
            max: 20,
            match: /^([\w\d-\.]*)?$/
        },
        title: {
            type: String,
            required: true,
            min: 6,
            max: 20
        }
    }), 'groups');
