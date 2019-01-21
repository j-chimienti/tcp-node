const express = require('express')
const logger = require('morgan')
const app = express();
const path = require('path')
const fs = require('fs')
require('dotenv').load()

app.use(logger('dev'))

app.use(express.static(__dirname + '/public'));
// app.use(express.errorHandler());


app.get('/test/:name', (req, res) => {

    res.send(`
        <html>
            <body>
            <video src="/${req.params.name}.mp4" controls ></video>
            </body>
        </html>
    `)
})

app.get('/', (req, res) => {

    req.sendFile(path.join(__dirname, 'public', 'index'))
})

app.post('/upload/:filename', (req, res) => {

    if (!(req.query.token === process.env.UPLOAD_TOKEN)) {

        res.status(400).send('Invalid Request')
    } else {

        var _filename = path.basename(req.params.filename)
        var  fileName = path.resolve(__dirname, 'uploads', _filename)

        console.log('write ', fileName)
        var sync = fs.createWriteStream(fileName)

        req.pipe(sync);

        sync.on('drain', () => {

            // console.log('drain', new Date().toLocaleTimeString())
            req.resume()
        })

        req.on('end', () => {

            io.emit('NEW_VIDEO', "SI")
            res.status(200).send('done')
        })
    }

});


const http = require("http");
var server = http.createServer(app).listen(3333)

const io = require('socket.io')(server)

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

});


app.io = io


module.exports = app
