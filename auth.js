var pbkdf2 = require('pbkdf2-sha256');
var jwt = require('jsonwebtoken');
var Sequelize = require("sequelize")

var sequelize = new Sequelize('mysql://pgina:heslo77@192.168.1.1:3306/pgina', {
  //TODO: perf tunning options here
})

var _django_pwd_match = function(key, djpwd) {
  var parts = djpwd.split('$');
  var iterations = parts[1];
  var salt = parts[2];
  return pbkdf2(key, new Buffer(salt), iterations, 32).toString('base64') === parts[3];
};

module.exports = function (req, res) {

  sequelize
    .query("SELECT * FROM auth_user WHERE username=?", null, {raw: true}, [req.body.uname])
    .on('success', function(found) {
      if(! found) {
        return res.send(401, 'Wrong user or password');
      }

      var profile = found[0];

      if(! _django_pwd_match(req.body.passwd, profile.password)) {
        return res.send(401, 'Wrong user or password');
      };

      // We are sending the profile inside the token
      profile.token = jwt.sign(profile, process.env.SERVER_SECRET, {
        expiresInMinutes: 60*5
      });

      delete(profile.password);

      res.json(profile);
    })
    .on('error', function(err){
      res.send(401, err);
    });

}
