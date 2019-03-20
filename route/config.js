
module.exports = {
	//Login
	'/login': {
		'method': ['POST'],
		'exclude': true
	},
	'/token': {
		'method': ['GET', 'DELETE'],
		'exclude': true
	},
	//User 
	'/user': {
		'method': ['GET', 'POST', 'PUT'],
		'exclude': true
	},
	'/user/password': {
		'method': ['PUT'],
		'exclude': true
	},
	'/user/id': {
		'method': ['GET', 'PUT'],
		'exclude': true
	},
	'/user/rol': {
		'method': ['GET'],
		'exclude': true
	},
	'/user/all': {
		'method': ['GET'],
		'exclude': true
	},
	//notification
	'/notification': {
		'method': ['GET', 'POST', 'PUT', 'DELETE'],
		'exclude': true
	},
	'/notification/id': {
		'method': ['GET'],
		'exclude': true
	},
	'/alert': {
		'method': ['GET', 'POST', 'PUT', 'DELETE'],
		'exclude': true
	},
	'/alert/id': {
		'method': ['GET'],
		'exclude': true
	},
	'/config': {
		'method': ['GET', 'POST', 'PUT', 'DELETE'],
		'exclude': true
	},
	'/config/public': {
		'method': ['GET'],
		'exclude': true
	},


};