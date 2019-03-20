"use strict";
const session = require('../../helper/session.js');
const BaseController = require('../baseController.js');

const queries = require('./queries.js');

const controllerToken = new BaseController({

    insertToken(userId, data, callback) {
        delete data.password;
        const token = session.insert(userId, data);
        callback(null, token);
    },

    getUserLogin(userData, callback) {
        this.executeQuery(queries.getUserLogin, userData, (err, result) => {
            callback(err, result);
        });
    },

    loginUser(userData, callback) {
        const that = this;
        this.getUserLogin(userData, (err, user) => {
            if (err || _.isEmpty(user)) {
                return callback('cantFindUser');
            }
            that.insertToken(user[0].id, user[0], (err, data) => {
                if (err || _.isEmpty(data)) {
                    return callback('server');
                }
                delete user[0].password;
                delete user[0].id;
                _.extend(data, user[0]);
                callback(null, data);

            });
        });
    }
});


module.exports = controllerToken;
