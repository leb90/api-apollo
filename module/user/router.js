"use strict";

const express = require('express');
const hasher = require('../../helper/hasher');
const userController = require('./controller');

const router = express.Router();


router.get("/all", (req, res, next) => {

	userController.getUsers((err, data) => {
		if (err || _.isEmpty(data)) {
			return res.sender(new MessageHandler("server"), next);
		}
		res.sender(new MessageHandler(data, true), next);
	});
});

router.get("/id", (req, res, next) => {

	const id = req.query.id;
	if (_.isEmpty(id)) {
		res.sender(new MessageHandler("server"), next);
	}

	userController.getUser(id, (err, data) => {
		if (err || _.isEmpty(data)) {
			return res.sender(new MessageHandler("server"), next);
		}
		res.sender(new MessageHandler(data, true), next);
	});
});

router.get("/", (req, res, next) => {
	const id = req.session.userId;
	if (!id) {
		return res.sender(new MessageHandler("server"), next);
	}

	userController.getUser(id, (err, data) => {
		if (err || _.isEmpty(data)) {
			return res.sender(new MessageHandler("server"), next);
		}
		res.sender(new MessageHandler(data, true), next);
	});
});


router.post("/", (req, res, next) => {
console.log("pasa")
	const userData = req.body;
	userData.password = hasher.password(userData.password);
	if (!_.isEmpty(userData)) {
		if (userData.email) {
			userController.getUserByEmail(userData.email, (err, data) => {
				if (err || !_.isEmpty(data)) {
					return res.sender(new MessageHandler("alreadyExist"), next);
				}
				userController.insertUser(userData, (err, data) => {
					if (err || _.isEmpty(data)) {
						return res.sender(new MessageHandler(err), next);
					}
					return res.sender(new MessageHandler(data, true), next);
				});
			});
		} else {
			userController.insertUser(userData, (err, data) => {
				if (err || _.isEmpty(data)) {
					return res.sender(new MessageHandler(err), next);
				}
				return res.sender(new MessageHandler(data, true), next);
			});
		}
	} else {
		return res.sender(new MessageHandler("server"), next);
	}

});

router.put("/", (req, res, next) => {
	const userData = req.body;
	const id = req.session.userId;
	if (_.isEmpty(userData)) {
		return res.sender(new MessageHandler("passwordIsEmpty"), next);
	}
	if (!_.isEmpty(userData.password)) {
		userData.password = hasher.password(userData.password);
	} else {
		delete userData.password;
	}

	userController.updateUser(userData, id, (err, data) => {
		if (err || _.isEmpty(data)) {
			return res.sender(new MessageHandler(err), next);
		}
		res.sender(new MessageHandler(userData, true), next);
	});

});

router.put("/password", (req, res, next) => {
	const userPassword = req.body;
	const id = req.session.userId;
	if (_.isEmpty(userPassword)) {
		return res.sender(new MessageHandler("passwordIsEmpty"), next);
	}

	userController.updatePassword(userPassword, id, (err, data) => {
		if (err || _.isEmpty(data)) {
			return res.sender(new MessageHandler(err), next);
		}
		res.sender(new MessageHandler({}, true), next);
	});
});

router.put("/id", (req, res, next) => {

	const userData = req.body;
	const id = req.query.id;

	if (!_.isEmpty(userData.password)) {
		userData.password = hasher.password(userData.password);
	} else {
		delete userData.password;
	}
	if (!_.isEmpty(userData)) {
		userController.updateUser(userData, id, (err, data) => {
			if (err || _.isEmpty(data)) {
				return res.sender(new MessageHandler(err), next);
			}
			res.sender(new MessageHandler(data, true), next);
		});
	}
});
module.exports = router;