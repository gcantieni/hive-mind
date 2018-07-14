const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3300;

const server = http.createServer((reqest, response) => {
  fs.readFile("map.json", (err, data) => {
    if (err) {
      return next(err);
    }
    response.writeHead(200, {'Content-Type': 'text/json'});
    response.write(data);
    response.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



