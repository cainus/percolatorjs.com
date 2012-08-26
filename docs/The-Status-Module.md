# The "status" module
The status module is automatically attached to your resource handler at request time.  It is just a bunch of helper functions for dealing with response statuses.

This is an important module because building great APIs requires excellent and consistent error and status reporting.

To understand what the codes mean, please refer to http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html .

## Usage
These methods generally set the HTTP status and end the response, so in general you should not expect to
write more to the response after these.  If a response body makes sense, it will generally be written 
automatically.  For clarity, it's recommended that when you call one of these functions, you call it with
return in front of it.  Here's an example:  
```javascript
exports.handler = {
  GET : function(req, res){
    return this.status.redirect('/someOtherUrl');
  }
}
```

Here are the functions that it makes available in your method handler:  
  
## Redirect scenarios
### `this.status.created(redirectUrl);`
This method is used for HTTP STATUS 201 scenarios when the server has just created a resource successfully 
so that the server can tell the client where to find it.  It sets the status to 201 and sets the 'Location' header to the redirectUrl. 

### `this.status.movedPermanently(redirectUrl);`
This method is used for HTTP STATUS 301 scenarios where a resource has been permanently moved somewhere 
else so the server can tell the client where to find it.  It sets the status to 301 and sets the 'Location' header to the redirectUrl. 

### `this.status.redirect(redirectUrl);`
This is just an alias of `movedPermanently()`

## Error Scenarios
All of the error scenarios are handled similarly and attempt to show a response body that indicates the error that occurred as well.  The status code will be set on the response as well as in that response body.

All of these methods additionally take a single parameter where additional detail information can be added.  For example:

```javascript
exports.handler = {
  GET : function(req, res){
    return this.status.internalServerError('The server is on fire.');
  }
}
```
Output for application/json:
```javascript
{"type":500,"message":"Internal Server Error","detail":"The server is on fire"}
```
##Error response methods (with example response for application/json):

###`this.status.badRequest([detail])`
```javascript
{"type":400,"message":"Bad Request"}
```
###`this.status.unauthenticated([detail])`
```javascript
{"type":401,"message":"Unauthenticated"}
```
###`this.status.forbidden([detail])`
```javascript
{"type":403,"message":"Forbidden"}
```
###`this.status.notFound([detail])`
```javascript
{"type":404,"message":"Not Found"}
```
###`this.status.methodNotAllowed([detail])`
```javascript
{"type":405,"message":"Method Not Allowed"}
```
###`this.status.notAcceptable([detail])`
```javascript
{"type":406,"message":"Not Acceptable"}
```
###`this.status.conflict([detail])`
```javascript
{"type":409,"message":"Conflict"}
```
###`this.status.gone([detail])`
```javascript
{"type":410,"message":"Gone"}
```
###`this.status.lengthRequired([detail])`
```javascript
{"type":411,"message":"Length Required"}
```
###`this.status.preconditionFailed([detail])`
```javascript
{"type":412,"message":"Precondition Failed"}
```
###`this.status.requestEntityTooLarge([detail])`
```javascript
{"type":413,"message":"'Request Entity Too Large"}
```
###`this.status.requestUriTooLong([detail])`
```javascript
{"type":414,"message":"Request URI Too Long"}
```
###`this.status.unsupportedMediaType([detail])`
```javascript
{"type":415,"message":"Unsupported Media Type"}
```
###`this.status.unprocessableEntity([detail])`
```javascript
{"type":422,"message":"'Unprocessable Entity"}
```
###`this.status.tooManyRequests([detail])`
```javascript
{"type":429,"message":"Too Many Requests"}
```
###`this.status.internalServerError([detail])`
```javascript
{"type":500,"message":"Internal Server Error"}
```
###`this.status.notImplemented([detail])`
```javascript
{"type":501,"message":"Not Implemented"}
```
###`this.status.badGateway([detail])`
```javascript
{"type":502,"message":"Bad Gateway"}
```
###`this.status.serviceUnavailable([detail])`
```javascript
{"type":503,"message":"Service Unavailable"}
```
###`this.status.gatewayTimeout([detail])`
```javascript
{"type":504,"message":"Gateway Timeout"}
```