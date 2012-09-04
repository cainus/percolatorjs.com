var _ = require('underscore');

// the root resource at /
exports.handler = {

  GET : function($){
    this.repr({ _links : this.uri.links()});
  }


};

