var express = require('express')
  , bodyParser = require('body-parser')
  , app = express();


module.exports = function(db, sendMail, cb) {

  var authapp = express();
  authapp.post('/login', require('./auth.js'));
  app.use('/auth', authapp);

  // create API app ------------------------------------------------------------

  var api = express();

  var expressJwt = require('express-jwt');

  // We are going to protect /api routes with JWT
  api.use(expressJwt({secret: process.env.SERVER_SECRET}));

  api.use('/dhcpdcfg', require('node-dhcp-rest-conf'));

  // create main app -----------------------------------------------------------

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  var prefix = '/api';
  app.use(prefix, api);

  require('lineman-express')(app, express.static, function(err) {
    if(err) { return cb(err); }

    return cb(null, app);
  });
};
