"use strict";
const CronJob = require('cron').CronJob;

new CronJob('0 */6 * * *', () => {
	console.log("Run Clean")
}, null, true, 'America/Los_Angeles');