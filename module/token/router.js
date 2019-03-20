"use strict";
const express = require('express');

const session = require('../../helper/session');

const router = express.Router();


router.get("/", (req, res, next) => {
    const token = {
        'token': req.session.token
    };
    const tokenSession = session.getByToken(token);
    if (_.isEmpty(tokenSession)) {
        return res.sender(new MessageHandler("invalidtoken"), next);
    }
    res.sender(new MessageHandler(tokenSession, true), next);
});

router.delete("/", (req, res, next) => {
    const token = {
        'token': req.session.token
    };
    const id = req.session.userId;

    const tokenSession = session.delete(id, token);
    if (!tokenSession) {
        return res.sender(new MessageHandler("invalidtoken"), next);
    }
    res.sender(new MessageHandler(tokenSession, true), next);

});



module.exports = router;