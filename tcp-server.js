/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp
server, but for some reason omit a client connecting to it.  I added an
example at the bottom.

Save the following server in example.js:
*/

var net = require('net');
const fs = require("fs");

var file = './assets/sample.mp4'
var server = net.createServer(function(socket) {


    var sync = fs.createReadStream(file);

    sync.on('error', function(e) {
        console.error(e);
    });
    sync.on('open', function() {
        sync.pipe(socket);
    });
    sync.on('finish', function() {
        socket.end();
    });
    // socket.write('Hello client');
    // socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');

/*
And connect with a tcp client from the command line using netcat, the *nix
utility for reading and writing across tcp/udp network connections.  I've only
used it for debugging myself.

$ netcat 127.0.0.1 1337

You should see:
> Echo server

*/


