const request = require('request');
const {URL} = require('url')
const fs = require('fs')
const file  = './assets/sample.mp4'
const path = require('path')
require('dotenv').load()

const fileName = path.basename(file);

const uri = new URL(`http://localhost:3333/upload/${fileName}`)

uri.searchParams.append('token', 'testing')

fs.createReadStream(file)
    .pipe(request.post(uri.href))
