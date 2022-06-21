const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello World!'
    }))
}).listen(4041,()=> console.log("servidor na porta 4041"));