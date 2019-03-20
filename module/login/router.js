"use strict";

const express = require('express');

const loginController = require('./controller.js');
const helperhasher = require('../../helper/hasher');

const router = express.Router();


router.post("/", (req, res, next) => {
    const userData = req.body;
    userData.password = helperhasher.password(userData.password);

    loginController.loginUser(userData, (err, user) => {
        if (err || _.isEmpty(user)) {
            return res.sender(new MessageHandler(err), next);
        }
        res.sender(new MessageHandler(user, true), next);

    });
});


module.exports = router;