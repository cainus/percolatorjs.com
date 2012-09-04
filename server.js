var _ = require('underscore');
var Percolator = require('Percolator');


var app = {
  staticDir : __dirname + '/static',
  resourcePath : '/api',
  port : process.env.PORT || 5000
};
var server = new Percolator(app);
server.use(function(req, res, next){
  // output method and url for each request
  console.log(req.method, req.url);
  next();
});

server.routeDirectory(__dirname + '/resources', function(err){
  if (err) {console.dir(err);throw err;}
  server.listen(function(err){
    console.log('Percolator running on ' + server.port);
  });
});

