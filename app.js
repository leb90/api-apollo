
require('./lib/global');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const useragent = require('express-useragent');

const init = require('./lib/init');
const authorized = require('./lib/authorized');
const routerMaster = require('./route/index');
const initialize = require('./lib/initialize');

app.use(init.console);
app.use(init.crossOrigin);
app.use(init.sender);

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.use(useragent.express());

app.use(authorized);

app.use("/", routerMaster);

initialize.runCluster(app);