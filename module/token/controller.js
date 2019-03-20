"use strict";
const session = require('../../helper/session.js');
const BaseController = require('../baseController.js');
const queries = require('./queries.js');

const controllerToken = new BaseController({

    insertToken(userId, callback) {
        const token = session.generateToken(userId);
        callback(null, token);
    },

    getUserLogin(userData, callback) {
        this.executeQuery(queries.getUserLogin, userData, (err, row) => {
            callback(err, row);
        });
    }
});

module.exports = controllerToken;