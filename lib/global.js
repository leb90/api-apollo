"use strict";
const fs = require('fs');
const Redis = require('ioredis');
const configServer = require('../config/server.json');
const configHandler = require('../handler/config.json');

let init, geoip2;

try {
    geoip2 = require('geoip2');
    geoip2.init();
} catch (err) {
    geoip2 = {
        lookupSimpleSync() {
            return {
                country: "Undefined"
            };
        }
    };
}
global.geoip2 = geoip2;

try {
    init = require('../config/instance.json');
} catch (err) {
    init = {};
}

const globalInit = {
    run() {
        if (!global.SessionRun) {
            this.globalConfig();
        }
    },
    
    globalConfig() {
        global.SessionRun = true;
        global._ = require('lodash');
        global.ConfigServer = this.setInitConfig();
        global.MSConnection = require('../db/mysql.js');
        this.getBasicTokens();
        this.existDirectoryLog();
        _.mixin({
            capitalize(string) {
                return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
            }
        });
        this.messageHandler();
        this.forMaster();
        this.startMessage(ConfigServer.port.staging);
    },

    getBasicTokens() {
        global.BasicTokens = {};
        require('./basicToken.js')((err, result) => {
            if (err) {
                return console.log(err);
            }
            global.BasicTokens = result;
        });
    },

    messageHandler() {
        global.MessageHandler = function (param, success)  {
            if(success){
                return [200, {
                    'status': 'success',
                    'data': param
                }];
            }
            let out;
            if (configHandler[param]) {
                out = [configHandler[param].status, configHandler[param]];
            } else {
                console.log("does not exist param");
                console.log(param);
                out = [500, {
                    "status": 500,
                    "message": "Server error"
                }];
            }
            return out;
        };
    },

    setInitConfig() {
       return _.extend(configServer, init);
    },

    existDirectoryLog() {
        fs.readdir(ConfigServer.log.parentDirectoryPath, (err, files) => {
            if (!err) {
                for (let i = 0; i < files.length; i += 1) {
                    if (files[i] === "Api-Apollo") {
                        return;
                    }
                }
                fs.mkdir(ConfigServer.log.directoryPath, err => {
                    return;
                });
            }
            console.log("Warning: error no such file or directory in function existDirectoryLog.");
            return;
        });
    },

    forMaster() {
        global.ListSession = {};
        global.ListClient = {};
        this.setSession();
        require('../cron/base.js');
    },

    setSession() {
        const redisSession = new Redis(ConfigServer.redisServer);
        const tokenKey = "PANEL-LIST-SESSION"+ConfigServer.mysql.database;
        redisSession.get(tokenKey, (err, result) => {
            redisSession.quit();
            if (result) {
                result = JSON.parse(result);
                global.ListSession = result;
            }
        });
    },

    startMessage(port) {
        console.log(`Server running on port ${port}!`);
    }
};

globalInit.run();