var _ = require('underscore');
var Resource = require('resorcery').resource;

// represent a collection of user resources

exports.handler = {
  GET : function(req, res){
    var that = this;
    var users = _.map(this.app.users, function(user){
      var selfLink = that.uri.get('users*', {'users' : '' + user.id});
      return { name : user.name,
               id : user.id,
               _links : { self : { href : selfLink} }
               };
    });
    var links = {};
    _.each(this.uri.links(), function(value, key){
      links[key] = { href : value };
    });
    this.repr({collection : users, _links : links});
  }

};

// represent a single user resource!!
exports.member = new Resource({

  fetch : function(req, cb){
    var user = this.app.users[this.uri.param('users')];
    if (!!user){
      cb(null, user); // null error, and returning the user object
    } else {
      cb(true); // true = there was an error
    }
  },

  GET : function(req, res){
    // TODO : put 'fetched' on 'this'
    var user = req.resource.fetched;
    // TODO I shouldn't have to append user.id to a
    // string for this to work
    user.id += '';
    user = { name : user.name,
             id : user.id,
             _links : {
                 // TODO this.uri.get() should return an absolute URL
                self :
                  {href : this.uri.get('users*', {'users' : user.id})},
                parent :
                  {href : this.uri.get('users')},
                followers :
                  {href : this.uri.get('users*followers', {'users' : user.id})}
              }
    };
    this.repr(user);
  }

});
