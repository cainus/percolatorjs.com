## About the 'app' parameter.
When you create an instance of Percolator, you need to pass it a config object that will later be available in all
resource methods as `this.app`.  Required parameters for this config object are:  

  **protocol** - 'http' or 'https'  
  **resourceDir** - the filesystem directory where the resources can be found (use an absolute path!)  
  **resourcePath** - the url path that all the resource will be routed from (eg. Setting it to '/' will serve the 
  resources from http://yourdomain.com/ while setting it to '/api' will serve the resources from 
  http://yourdomain.com/api .  
  **staticDir** - The directory on the filesystem from which you will serve static content (use an absolute path!).  
  **port** - the http port.  A low port like 80 will not work unless you run the app with root privileges.  
  
It's also important to note that you can add your own parameters as well.  It's a great way to instantiate shared 
resources (like a database connection) in the main application and pass it to all resources.

You're obviously going to want to limit the number of `app` variables that you add beyond the necessary ones, but
certain types of objects might make sense in that shared space.