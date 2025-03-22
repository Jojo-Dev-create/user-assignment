// server.js
const http = require('http');
const requestHandler =require('./routes/users'); 

const server = http.createServer(requestHandler); 

server.listen(3000);
