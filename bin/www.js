const app = require('../server')
const http = require("http");
var server = http.createServer(app).listen(3333)

const io = require('socket.io')(server)

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

});
