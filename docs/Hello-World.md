## Hello World Quick Start:
*  `npm install Percolator`
*  Create a `server.js` in your project directory, and copy this code below into it:

```javascript
var Percolator = require('Percolator');

var server = new Percolator();
server.router.route('/', {  GET : function(req, res){
                              res.end("Hello World!");
                            }});
server.listen(function(err){
  console.log('server is listening on port ', server.port);
});

```

*  Run the server:
```
  node server.js
```

*  See your "Hello World" output at http://localhost:3000/ and be completely floored by the greatest 
API of all time.  Or not.

## Hello World Refactored:

While this is pretty simple, it's also not super-interesting.  One of the interesting features of 
Percolator is that it lets you load your route-handling code from external files instead:

* Move your "Hello World" handler into a file at the path `./resources/index.js` by first creating the 
`resources` directory and then the `index.js` file in it and then copying the handler logic into `index.js`
like so:

```javascript
  exports.handler = {
    GET : function(req, res){
      res.end('Hello World!');
    }
  }
```
We'll call files like that "resources" from now on.


* Change your server.js to call `routeDirectory()` instead of `server.router.route()` like so:

```javascript
var Percolator = require('Percolator');

var server = new Percolator();
server.routeDirectory(__dirname + '/resources', function(err){
  if (!!err) {console.log(err);}
  server.listen(function(err){
    console.log('server is listening on port ', server.port);
  });
});

```

*  Run the server:
```
  node server.js
```

*  See your "Hello World" output at http://localhost:3000/ .