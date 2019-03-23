"use strict";
const crypto = require('crypto');
const expires = require('expires');
const timestamp = expires.after('2 days');
const Redis = require('ioredis');

const setRedis = data => {
    const redis = new Redis(ConfigServer.redisServer);
    redis.set("PANEL-LIST-SESSION"+ConfigServer.mysql.database, JSON.stringify(data));
    redis.quit();
}

module.exports = {

    insert: (userId, data) => {
        const tokenData = {
            userId: userId,
            token: crypto.randomBytes(32).toString('hex'),
            expiration_date: timestamp
        };
        _.extend(tokenData, data);
        if (ListSession[userId] && _.isArray(ListSession[userId].tokens)) {
            ListSession[userId].tokens.push(tokenData);
        } else {
            ListSession[userId] = {
                tokens: [tokenData]
            };
        }
        setRedis(ListSession);
        return tokenData;
    },

    get: (userId, tokenData) => {
        const userTokens = ListSession[userId].tokens;

        if (ListSession[userId] && _.isArray(userTokens)) {
            let results = _.find(userTokens, item => {
                return item.token === tokenData;
            });
            if (!_.isEmpty(results)) {
                return userTokens;
            }
        }
        return false;
    },

    getByToken: tokenData => {
        let findUserToken = null;
        _.find(ListSession, item => {
            if (!item || !item.tokens) {
                return false;
            }
            let findToken = _.find(item.tokens, data => {
                return data.token === tokenData.token;
            });
            if (!_.isEmpty(findToken)) {
                findUserToken = findToken;
            }
        });
        if (!_.isEmpty(findUserToken)) {
            return findUserToken;
        }

        return false;
    },

    update: (userId, data) => {
        if (ListSession[userId] && _.isArray(ListSession[userId].tokens)) {
            const length = ListSession[userId].tokens.length;
            for (let i = 0; i < length; i += 1) {
                _.extend(ListSession[userId].tokens[i], data);
            }
            return true;
        }
        return false;
    },

    deleteAll: userId => {
        delete ListSession[userId];
        return true;
    },


    delete: (userId, tokenData) => {
        let globalIndex;
        ListSession[userId].tokens.find((item, index) =>{ 
            if (item.token === tokenData.token) { 
                globalIndex = index;
            } 
        });
        if (globalIndex >- 1) {
            ListSession[userId].tokens.splice(globalIndex, 1);
            setRedis(ListSession);
            return true;
        }
        return false;
    }
};

