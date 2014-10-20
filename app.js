var express = require('express')
  , bodyParser = require('body-parser')
  , app = express();

// create API app -------------------------------------------------------------

var api = express();

api.post('/login', require('./auth.js'));

var expressJwt = require('express-jwt');

// We are going to protect /api routes with JWT
api.use(expressJwt({secret: process.env.SERVER_SECRET}));

if (! ('FRONTEND_APP' in process.env)) {
  api.use(require('cors')({maxAge: 86400}));
}

api.use('/dhcpdcfg', require('node-dhcp-rest-conf'))

// create main app ------------------------------------------------------------

if ('FRONTEND_APP' in process.env) {
  // mount angular frontend -> no need for CORS
  console.log("mounting angular frontend ...");
  app.use(express.static(process.env.FRONTEND_APP));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var prefix = '/api';
app.use(prefix, api);

if ('FRONTEND_APP' in process.env) {
  app.get('*', function(req, res) {
    res.sendfile(process.env.FRONTEND_APP + '/index.html');
  });
}

module.exports = app;
