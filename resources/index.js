var Resource = require('resorcery').resource;
var _ = require('underscore');

// the root resource at /
exports.handler = new Resource({

  GET : function(req, res){
    this.repr({ _links : this.uri.links()});
  }


});

