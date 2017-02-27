const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

const appConfig = require('./app/config/app');
const api = require('./app/api');
const static = require('express-static');

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

// configure app
app.use(morgan('dev'));

// configure body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
// create our router
let router = express.Router();

app.use(static(__dirname + '/static'));

// REGISTER OUR ROUTES -------------------------------
app.use('/api', api(router));

// START THE SERVER
// =============================================================================
const port = appConfig.port;
app.listen(port);
console.log('Started on port ' + port);