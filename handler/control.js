"use strict";
const controlStatus = require('../handlers/config.json');

module.exports = (type, ob) => {
    if (controlStatus[type] && ob.status) {
    	ob.status = false;
        ob.res.status(controlStatus[type].status);
        ob.res.sender(controlStatus[type]);
    }
};
