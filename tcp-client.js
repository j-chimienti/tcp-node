
/*
And connect with a tcp client from the command line using netcat, the *nix
utility for reading and writing across tcp/udp network connections.  I've only
used it for debugging myself.

$ netcat 127.0.0.1 1337

You should see:
> Echo server

*/

/* Or use this example tcp client written in node.js.  (Originated with
example code from
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

const fs = require('fs')

const file  = './assets/sample.mp4'

function reader() {


}


var net = require('net')
var client = new net.Socket();
client.connect({port: 1337, host: '127.0.0.1'}, function() {
    console.log('Connected');
    var sync = fs.createWriteStream('./assets/copy.mp4')

    client.on('data', function(data) {
        sync.write(data);
    });

    client.on('error', function(err) {
        // if (cb_called == true) return false;
        // cb_called = true;
        console.error(err)
    });

    client.on('close', function() {
        //if (cb_called == true) return false;

        console.log('done')
        //debug(chalk.bold.yellow('[DSS]') + ' File received on ', dest_file);
        //return cb();
    });
    //fs.createReadStream(file).pipe(client.write)
    //client.write('Hello, server! Love, Client.');
    //client.write();
});



