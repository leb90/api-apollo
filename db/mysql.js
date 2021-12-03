"use strict";
const mysql = require('mysql');
const conn = mysql.createPool(ConfigServer.mysql);
const connNew = mysql.createConnection(ConfigServer.mysql);

connNew.connect(err => {
    if (err) {
        return console.log("Without Database connection",err);
    }

    connNew.config.queryFormat = function(query, values) {
        if (!values) {
            return query;
        }
        const dataInformation = query.replace(/\:(\w+)/g, function(txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }
            return txt;
        }.bind(this));
        return dataInformation;
    };
});

module.exports = {
    'conn': conn,
    'connNew': connNew
};