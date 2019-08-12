require('module-alias/register');

const { app } = require('@config/app');
const bodyParser = require('body-parser');

// Configs
app.use(bodyParser.json());

// Load controllers and services
require('@config/loader');

app.listen(3000);

module.exports = app;