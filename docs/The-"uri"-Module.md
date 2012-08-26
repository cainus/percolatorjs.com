# The "uri" API
Each method you define has access to a 'uri' module that understands the context of each particular request 
that it's used in.  The module makes a number of convenient methods available for dealing with uri's and 
generally making the parsing of uri's simpler and the creation of new uri's simple.  Here are example usages:

## General Usage:

```javascript
  exports.handler = {
    GET : function(req, res){
      res.send(this.uri.self());   // this will return the current url
    }
  }
```

## Api specifics:

###`this.uri.absolute(path)`
Takes a relative path and returns an absolute path using the hostname header.
```javascript
this.uri.absolute("/somepath");
// returns "http://hostname.com/somepath"
```

###`this.uri.help()`
returns an object containing a bunch of method names from this module and their values.  Useful for debugging.

For example, for a url like `http://somehostname.com:8080/artist/1234/song?genre=hiphop`...
```javascript
this.uri.help()
// returns something like:
{ params : { artist : 1234},
  links  : { parent : { href : 'http://somehostname.com:8080/artist/1234'},
             self : { href : 'http://somehostname.com:8080/artist/1234/song'}
           },
  parse  : { href : 'http://somehostname.com:8080/artist/1234/song?genre=hiphop', 
             protocol : 'http', 
             host : 'somehostname.com:8080', 
             hostname : 'somehostname.com', 
             port : 8080,
             pathname : '/artist1234',
             search : '?genre=hiphop'},
  query  : {genre : 'hiphop'} }
```

###`this.uri.self()`
returns the current uri (as an absolute uri).
```javascript
this.uri.self();
// returns 'http://hostname.com/thecurrentpath/'  (if that's the current url)
```
###`this.uri.params()`
returns an object containing the name/value pairs of variables extracted from the uri's "path" (NOT 
including querystring).  An optional uri may be passed in, but the default is to use the current 
request's uri. 

For example, if the URI is `http://localhost/artist/1234/song/5678`, then...
```javascript
this.uri.params()
// ... will return:
{ artist : 1234, song : 5678 }
```

###`this.uri.param(name);`
Retrieves the specified param value by the input param name from the object returned by this.uri.params() 
(see above).  
For example, if the URI is `http://localhost/artist/1234/song/5678`, then...
```javascript
this.uri.param("song");
// ... will return 5678
```

###`this.uri.urlEncode(somestr);`
take a string and return a url-encoded version of it.  This method uses node's `querystring` module's `escape()`.
```javascript
this.uri.urlEncode("this is a test");
// returns "this%20is%20a%20test"
```
###`this.uri.urlDecode(someEncodedStr)`
take a url-encoded string and return a decoded version of it.
```javascript
this.uri.urlDecode("this%20is%20a%20test");
// returns "this is a test"
```

###`this.uri.query([url]);`
Get the querystring data from the current url as an object with the name/value pairs in the querystring.  An 
alternative url can optionally be passed in.
```javascript
this.uri.query('http://asdf.com/path/?this=is&a=test');
// returns: 
{ this:is, a:test }
```
###`this.uri.queryString(queryHash);`
Take an input object and create a querystring of the name/value pairs in the `queryHash`.
```javascript
this.uri.queryString({ this:is, a:test }});
// returns: '?this=is&a=test'
```
###`this.uri.pathJoin(...);`
Takes a list of strings and arrays of strings and returns a forward-slash-delimited path of all the pieces
in the order that they appear (without a trailing slash).
```javascript
this.uri.pathJoin("asdf", ["qwer", "tyui"], "1234");
returns '/asdf/qwer/tyui/1234'
```

###`this.uri.links();`
Returns a dictionary of links that the router knows about for this resource, usually including `parent` and `self` links and possibly child urls.
```javascript
this.uri.links();
// returns something like...
  {self : {href : 'http://localhost/self'}, 
   parent : {href :'http://localhost/'}, 
   somechild : {href : 'http://localhost/self/somechild'}
```

###`this.uri.parent();`
Get the parent URI of the current URI.  An optional URI may be passed in to get its' parent's URI instead.   
```javascript
this.uri.parent("http://asdf.com/asdf");
// returns "http://asdf.com/"
```

###`this.uri.namedKids();`
Get a dictionary of all the child urls with their names.For example, if a url `http://hostname.com/artist/1234` has child paths /artist/1234/songs and /artist/1234/albums, then...
```javascript
this.uri.namedKids();
// ... would return something like:
{ '/artist/1234/songs' : 'songs', '/artist/1234/albums' : 'albums' }
```

###`this.uri.kids();`
Get a dictionary of all the child urls with their names if they have names.  For example, if a url `http://hostname.com/artist/1234` has child paths /artist/1234/songs and /artist/1234/albums, then...
```javascript
this.uri.kids();
// ... would return something like:
{ '/artist/1234/songs' : 'songs', '/artist/1234/albums' : 'albums' }
```
It should be noted that the `namedKids()` method is the preferred method of getting child paths, 
because if you're routing with `routeDirectory()` as is normal, all child routes will have names.  

###`this.uri.parse([url]);`
Returns the result of node's url.parse ( http://nodejs.org/docs/v0.9.0/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost ) 
for the current URI.  An optional URI can be passed to use that one instead.  
```javascript
this.uri.parse();
//returns:
{ href : 'http://somehostname.com:8080/artist/1234/song?genre=hiphop', 
  protocol : 'http', 
  host : 'somehostname.com:8080', 
  hostname : 'somehostname.com', 
  port : 8080,
  pathname : '/artist1234',
  search : '?genre=hiphop'}
```


###`this.url.get(nameOrPath [, variableHash]);`
Gets a url by name, or path.  An optional hash may be passed of variables to fill in necessary path variables.
```javascript
this.url.get('artist', {artist : 1234});
// could return something like:  'http://hostname.com/artist/1234' if such a route exists.
```