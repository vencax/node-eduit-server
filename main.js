
var port = process.env.PORT || 8080;

require('./app').listen(port, function() {
  console.log('gandalf do magic on ' + port);
});
