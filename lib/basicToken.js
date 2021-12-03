"use strict";

module.exports = callback => {
    (function getmeTokens(){
        MSConnection.conn.query('SELECT id, name, token FROM application', (err, result) => {
            let out = {};
            if (_.isEmpty(result)) {
                setTimeout(function(){
                    getmeTokens()
                },5000);
                return callback("Without Basic TOKENS");
            }
            for (let i = 0; i < result.length; i += 1) {
                out[result[i].token] = { "applicationId" : result[i].id };
            }
            callback(null, out);
        });
    })();
};