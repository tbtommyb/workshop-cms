var http = require('http');
var fs = require('fs');


function handler(request, response) {
  var endpoint = request.url;
  console.log(endpoint);

  if (endpoint === '/'){
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error){
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else {
    var extension = endpoint.split('.')[1];
    var contentType;
    if(extension === 'css') {
      contentType = 'text/css';
    } else if(extension === 'ico') {
      contentType = 'image/ico';
    }
    response.writeHead(200, {'Content-Type': contentType});
    fs.readFile(__dirname + '/public' + endpoint, function(error, file) {
      if(error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }
}

var server = http.createServer(handler);

server.listen(3000, function (){
  console.log("Server is listening on port 3000. Ready to accept requests!")
});
