// Main starting point of the application
// using earlier nodejs, so no import statements
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

// App Setup
// incoming requests pass through these
// morgan is for logging
// bodyParser is for parsing
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
