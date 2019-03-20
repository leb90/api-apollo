"use strict";

const queries = require('./queries.js');
const BaseController = require('../baseController.js');
const hasher = require('../../helper/hasher');

const controllerUser = new BaseController({

	 getUsers(callback) {
		this.executeQuery(queries.getUsers, (err, rows) => {
			if (err) throw err;
			callback(err, rows[0]);
		});
	},

	getUser(id, callback) {
		this.executeQuery(queries.getUser({ userId: id }), [], (err, result) => {
			callback(err, result);
		});
	},

	getUserByEmail(email, callback) {
		this.executeQuery(queries.getUserByEmail, {
			email: email
		}, callback);

	},

	insertUser(userData, callback) {
		this.executeQuery(queries.insertUser, userData, (err, rows) => {
			callback(err, rows);
		});
	},

	updateUser(userData, userId, callback) {
		this.executeQuery(queries.updateUser, [userData, userId], (err, rows) => {
			if (err || _.isEmpty(rows)) {
				return callback(err);
			}
			callback(null, rows);
		});
	},

	getPassword(id, callback) {
		this.executeQuery(queries.getPassword, { id: id }, (err, result) => {
			if (_.isEmpty(result) || _.isEmpty(result[0].password)) {
				return callback("server");
			}
			callback(null, result[0].password);
		});
	},

	updatePassword(dataPassword, id, callback) {

		const that = this;
		let oldPassword = dataPassword.oldPassword;
		let newPassword = dataPassword.newPassword;

		this.getPassword(id, (err, data) => {

			if (err || _.isEmpty(data)) {
				return callback("server");
			}
			oldPassword = hasher.password(oldPassword);

			if (data !== oldPassword) {
				return callback("cantPass");
			}
			newPassword = hasher.password(newPassword);
			newPassword = {
				password: newPassword
			};

			that.executeQuery(queries.updateUser, [newPassword, id], (err, result) => {
				if (_.isEmpty(result)) {
					return callback("server");
				}
				const out = {
					"changedRows": result.changedRows
				};
				callback(null, out);
			});
		});

	}
});

module.exports = controllerUser;