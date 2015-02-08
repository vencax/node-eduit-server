
require('coffee-script/register');

var port = process.env.PORT || 8080;
var sendMail = null;

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  host: process.env.EMAIL_HOST,
  port: 25,
  ignoreTLS: true
}));

sendMail = function(data, cb) {
  console.log(data);
  // transporter.sendMail(data, cb);
};

var modelModules = [
  require('./models')
];

require('./db').init(modelModules, function(err, sequelize) {
  if(err) { return console.log(err); }

  require('./app')(sequelize, sendMail, function(err, app) {
    if(err) { return console.log(err); }

    app.listen(port, function() {
      console.log('gandalf do magic on ' + port);
    });
  });
});
