
Installation
------------

  Required:  NodeJS/npm

  At the rfr-home directory run:  npm install
    (this loads the necessary NodeJS modules based on rfr-home/package.json)

  It may be necessary to create a file in the logs directory called: winston.log
  
Execute
-------
  
  At the rfr-home directory run: gulp serve
    (instructs the gulp task manager to start the ExpressJS server)

  Enter the following browser url:  http://localhost:3000/
  
Notes
-----

  The main application file:  rfr-home/index.js
  
  General application flow: 
    rfr-home/index.js --> rfr-home/routes/*.js --> rfr-home/controllers/*.js --> rfr-home/views
    
  Files exposed to the public:  rfr-home/public
  
  
