"use strict";
const mysql = require('mysql');
const paramConnection = ConfigServer.mysql;

function baseController(ob) {
    /* jshint ignore:start */
    _.extend(this, ob);
    /* jshint ignore:end */
}

baseController.prototype = {

    executeQuery(query, params, cb) {
        if (query.search(":") > 0) {
            MSConnection.connNew.query(query, params, (err, rows) => {
                cb(err, rows);
            });
            return;
        }

        MSConnection.conn.query(query, params, (err, rows) => {
            cb(err, rows);
        });
    },

    createConnection(cb) {
        const conn = mysql.createConnection(paramConnection);
        cb(conn);
    },

    beginTransaction(conn, cb) {
        const that = this;
        conn.beginTransaction(err => {
            if (err) {
                that.endConnection(conn, () => {
                    return cb(err);
                });
            } else {
                return cb(err, conn);
            }
        });
    },

    commitTransaction(conn, cb) {
        const that = this;
        conn.commit(err => {
            if (err) {
                console.log(err);
                that.rollbackTransaction(conn, cb);
            } else {
                that.endConnection(conn, () => {
                    cb('Success Commit');
                });
            }
        });
    },

    rollbackTransaction(conn, cb) {
        const that = this;
        if(!conn)
            return that.endConnection(conn, cb);
        conn.rollback(() => {
            that.endConnection(conn, cb);
        });
    },

    endConnection(conn, cb) {
        if(conn)
            conn.end();
        cb();
    },

    doQuery(conn, query, params, cb) {
        conn.query(query, params, (err, data) => {
            cb(err, data);
        });
    }

};

module.exports = baseController;