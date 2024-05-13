const http = require('http');
const UserController = require('./userController');

http.createServer(async function(req, res) {
    const counters = {};

    try {
        await UserController(req, res, counters);
    } catch (error) {
        console.error('Error handling request:', error.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error');
        res.end();
    }
}).listen(8080);

console.log('Server is running on port 8080');
