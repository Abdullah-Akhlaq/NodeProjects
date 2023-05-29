const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/firstTry") {
    res.write(JSON.stringify([1, 2, 4]));
    res.end();
  }
});

server.listen(4000);

console.log('hell0 ');