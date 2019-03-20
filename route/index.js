
"use strict";
const express = require('express');
const router = express.Router();

const routerToken = require('../module/token/router');
const routerUser = require('../module/user/router');
const routerLogin = require('../module/login/router');
/*const routerAlert = require('../module/alert/router');
const routerConfig = require('../module/config/router');*/



router.use("/token", routerToken);
router.use("/user", routerUser);
router.use("/login", routerLogin);
/*
router.use("/alert", routerAlert);
router.use("/config", routerConfig);*/

module.exports = router;