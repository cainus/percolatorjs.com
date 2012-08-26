## How routing works
Your resource directory and the files and subdirectories in it are routed to URLs, so that the organization on 
the filesystem dictates your urls.  This means:
* you don't have to maintain a list of routes anywhere
* you know exactly where to find everything 
* you have a simple convention for code organization.

## It's weird.  But that's okay.
You map a tree of resources, so every resource must have a parent resource (except the root of course).  That means you can't just route to arbitrary paths defined by regular expressions, but then again arbitrary routes make APIs tougher for clients to consume.  What you get in return is a simpler API for your users, and you get a much simpler way to create hyperlinks to other resources.

### The base path
The base path is the URI path under which all of your resources will be served. It's called `resourcePath` in 
your application config (see the quick start for an example of setting it to '/').  It doesn't need to be set 
to `/`, for instance -- you could set it to `/api`, and then the quick start example would serve from `/api` instead.

### The index.js file.
The server won't start without an `index.js` file in your resources directory.  It should contain the resource that handles requests to your base path.

### Adding other routes to a path
Just add more files to the directory!  Adding `resources/newone.js` will make the handler in that file available at the `/newone` url . 

### Dynamic Routes  (routes with variable parts)
You can create a dynamic route under any existing route by adding another handler to that dynamic route, but exporting it as `member` instead of `handler`.

For example, if you've got an `resources/example.js` that exports a handler like so:
```javascript
exports.handler = {
  GET : function(req, res){
    this.repr({message : "hiya!"});
  }
}
```
You can just export a `member` module as well like so:
```javascript
exports.handler = {
  GET : function(req, res){
    this.repr({message : "hiya!"});
  }
}

exports.member = {
  GET : function(req, res){
    this.repr({message : 'hiya ' + this.uri.param('example') + '!'});
  }
}
```

The result is that requests to /example will respond with:
```javascript
{"message" : "hiya!"}
```
...and requests to /example/scarlet will respond with:
```javascript
{"message" : "hiya scarlet!"}
```

Notice that the variable part of the path is available at `this.uri.param('example')`.  
For any path variables like this, the variable is named after the static part of the path that 
proceeds it.  For example, if the path was `/asdf/5678`, we could get the value 5678 from 
`this.uri.param('asdf')`.

###Nested Routes
A nested route is a route that nests one or more resources under other resources hierarchically.  Percolator's router is built to handle and enforce those types of hierarchies.  Flatter routes are generally simpler code-wise, and simpler for the consumers of your API to consume, but sometimes nested routes can make sense too.

If we've got a resource in `resources/me.js` like this...
```javascript
exports.handler = {
  GET : function(req, res){
    this.repr({ name : "Gregg", favouritefood : "Hawaiian Pizza"});
  }
}
```
... it will be available at the url `/me`.  If we want to add a resource at /me/blog, we need to:

1.  add a `resources/me` directory next to `resources/me.js`
2.  put a `blog.js` in that `resources/me/` directory.
3.  put some handler code in that `resources/me/blog.js`:
```javascript
exports.handler = {
  GET : function(req, res){
    this.repr({ url : "http://caines.ca"});
  }
}
```

Now requests to `/me/blog` will get this response:
```javascript
{"url" : "http://caines.ca"}
```
 
Routes can be nested, doubly-nested, triply-nested, etc to achieve any hierarchy you want.

Nested routes can also be combined with dynamic routes to create nested dynamic routes.




