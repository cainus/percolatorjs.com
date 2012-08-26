## What's a "resource"?
Resources are objects that you export for the purpose of handling and responding to http requests.  

A single resource handles all the HTTP methods for a single URL path.  Any object that provides the HTTP methods can be used and just has to be exported as a javascript module.  

Here's a "hello world" example:

```javascript
  exports.handler = {
    GET : function(req, res){
      res.end('Hello World!');
    }
  }
```

This example is just providing the GET method, so when your users use other methods like POST and DELETE on it will just respond with 405 errors.  You can easily implement any other HTTP method that you want, by just defining the function by that name (use all caps!).

Resources are just node modules that Percolator automaticaly require()s.  You have to export them as "handler" like in the "Hello World" example above.

Any particular method that you implement takes request and response parameters, in that order (The "Hello World"
example just calls them 'req' and 'res' respectively)).  These are the [request]( http://nodejs.org/api/http.html#http_class_http_serverrequest )
and [response]( http://nodejs.org/api/http.html#http_class_http_serverresponse ) objects from node itself.