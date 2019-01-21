const express = require('express')
const logger = require('morgan')
const app = express();
const path = require('path')
const fs = require('fs')
require('dotenv').load()


app.use(logger('dev'))
// app.use(express.errorHandler());


app.get('/hello', (req, res) => {

    res.send('hi')
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

            res.status(200).send('done')
        })
    }

});

app.listen(3333, () => {
    console.log('3333')
})

module.exports = app
