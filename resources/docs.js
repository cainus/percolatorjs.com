var fs = require('fs');
var path = require('path');
var ghm = require("github-flavored-markdown");

var dir = __dirname + '/../docs';


exports.handler = {
  GET : function($){
    var that = this;
    fs.readdir(dir, function(err, files){
      if (!!err){
        console.log(that.status); //.internalServiceError(err);
        $.res.end(JSON.stringify(err));
      }
      files = _.map(files, function(file){
        console.log(path.extname(file));
        if (path.extname(file) === '.md'){
          console.log(file);
          file = file.substring(0, (file.length - 3));
          console.log(file);
          return {
            name : file,
            _links : { self : {href :that.uri.self() + '/' + that.uri.urlEncode(file)} }
          };
        }
      });
      that.repr({docs : files, _links : that.uri.links()});
    });
  }
};



exports.member = {
  GET : function($){
    var filename = this.uri.urlDecode(this.uri.param('docs'));
    var that = this;
    if (filename.indexOf('..') != -1){
      return that.status.notFound(that.uri.self());
    }
    filename += '.md';
    var contents = fs.readFile(dir + '/' + filename, function(err, contents){
      if (!!err){
        return that.status.internalServerError(err);
      }
      contents = ghm.parse(contents + '');
      $.res.setHeader('content-type', 'text/html');
      $.res.end(contents);
    
    });
  }

};
