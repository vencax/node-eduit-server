var express = require('express')
  , bodyParser = require('body-parser')
  , app = express();

// create API app -------------------------------------------------------------

var api = express();

if (! ('FRONTEND_APP' in process.env)) {
  api.use(require('cors')({maxAge: 86400}));
}

api.use('/dhcpdcfg', require('node-dhcp-rest-conf'))

api.post('/login', function(req, res) {
  res.json({ message: 'logging in!' });
});

// create main app ------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if ('FRONTEND_APP' in process.env) {
  // mount angular frontend -> no need for CORS
  console.log("mounting angular frontend ...");
  app.use(express.static(process.env.FRONTEND_APP));
}

var prefix = '/api';
app.use(prefix, api);

if ('FRONTEND_APP' in process.env) {
  app.get('*', function(req, res) {
    res.sendfile(process.env.FRONTEND_APP + '/index.html');
  });
}

exports.app = app;
