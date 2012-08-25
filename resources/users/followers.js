var _ = require('underscore');
var Resource = require('resorcery').resource;


// the followers collection for a given user

exports.handler = new Resource({

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
    var followerIds = req.resource.fetched.followers;
    followerIds = _.map(followerIds, function(id){ return id + ''; });
    var followers = _.filter(this.app.users, function(user){
      return _.include(followerIds, user.id + '');
    });
    var that = this;
    var users = _.map(followers, function(user){
      return { name : user.name,
               id : user.id,
               _links : {
                   // TODO I shouldn't have to append user.id to a
                   // string for this to work
                  self : { href :
                      that.uri.get('users*', {'users' : '' + user.id})
                    }
                  }
               };
    });
    var parentLink = this.uri.get('users*', {'users' : '' + this.uri.param('users')});
    var links = {
      self : { href : this.uri.self()},
      parent : { href : parentLink}
    };
    this.repr({collection : users, _links : links});
  }
});
