"use strict";
const allRoutes = require('../route/config');
const sessionHelper = require('../helper/session');

const getUserAgent = req => {
    const data = req.useragent;

    const ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
	let country = geoip2.lookupSimpleSync(ip).country;
	if (country === "Undefined") {
		country = "**";
	}
    return {
        platform: data.platform,
        browser: data.browser,
        ip: ip,
        country: country
    };
}

const getToken = headers => {
	const token = headers.authorization;
	return decodeURIComponent(token);
}

const validToken = (headers, regex) => {
	const token = getToken(headers);
	if (token) {
		token = regex.exec(token);
		return token && token[2] ? token[2] : false;
	}
	return false;
}

const validBearer = (headers, cb) => {
	const token = validToken(headers, /(Bearer) (\W.+|\w.+)/);
	if (token) {
		let session = sessionHelper.getByToken({ 'token': token });
		if (session) {
			return cb(null, session);
		}
	}
	cb('permission');
}

const validBasic = (headers, cb) => {
	const token = validToken(headers, /(Basic) (\W.+|\w.+)/);
	if (token && BasicTokens[token]) {
		//valdia contra base de datos el basic token
		return cb(null, BasicTokens[token]);
	}
	cb('permission');
}

const validator = (route, method, headers, cb) => {

	if (_.isEmpty(route) || (route.method !== '*' && !_.includes(route.method, method))) {
		return cb('permission');
	}

	if (route.exclude) {
		return cb(null, {});
	}

	if (route.bearer) {
		return validBearer(headers, cb);
	}

	if (route.basic) {
		return validBasic(headers, cb);
	}

	return false;
}

module.exports = (req, res, next) => {
	const method = req.method;
	const url = req.originalUrl.split("?")[0];
	const route = allRoutes[url];
	const headers = req.headers;
    const userAgentData = getUserAgent(req);

	validator(route, method, headers,  (err, session) => {

		//session.userAgent = userAgentData;
		//req.session = session;
		next();
	});
};

