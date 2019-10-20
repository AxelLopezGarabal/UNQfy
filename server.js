 
const http = require('http');
const app = require('./app');

const port = 8000;

server = http.createServer(app);

server.listen(port, () => console.log(`Listening to port ${port}`))