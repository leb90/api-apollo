"use strict";
const crypto = require('crypto');
const _ = require('lodash');

module.exports = {
    
	password(data){
		if (_.isString(data)) {
			return crypto.createHash('sha1').update(data).digest('hex');
		}
		return '';
	}
};