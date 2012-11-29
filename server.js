var _ = require('underscore');
var Percolator = require('Percolator').Percolator;


var app = {
  staticDir : __dirname + '/static',
  resourcePath : '/api',
  port : process.env.PORT || 5000
};
var server = new Percolator(app);
server.onRequest(function(handler, context, cb){
  // output method and url for each request
  console.log(context.req.method, context.req.url);
  cb(context);
});

server.routeDirectory(__dirname + '/resources', app.resourcePath, function(err){
  if (err) {console.dir(err);throw err;}
  server.listen(function(err){
    console.log('Percolator running on ' + server.port);
  });
});

