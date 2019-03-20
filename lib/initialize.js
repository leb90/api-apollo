
"use strict";
const http = require('http');
/*const numCPUs = require('os').cpus().length;*/
module.exports = {
    numCPUs: 1,
    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        //let bind = typeof portConfig === 'string' ? 'Pipe ' + portConfig : 'Port ' + portConfig;
        switch (error.code) {
            case 'EACCES':
            case 'EADDRINUSE':
                process.exit(1);
                break;
            default:
                throw error;
        }
    },
    runCluster(app) {
        let serverStaging;
        const portConfig = ConfigServer.port.staging;
        if (portConfig) {
            serverStaging = http.createServer(app).listen(ConfigServer.port.staging);
            serverStaging.on('error', this.onError);
        }
    }
};