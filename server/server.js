import express from 'express'
import pkg from 'scramjet'
import axios from 'axios'
import fs from 'fs'

const {StringStream} = pkg
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
})
app.get('/api', function (req, res) {
    // GET request for remote image in node.js
    axios({
        method: "get",
        url: "http://bit.ly/2mTM3nY",
        responseType: "stream",
    }).then(function (response) {
        console.log(response)
        response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
    });
})
app.get('/stock', function (req,res) {
    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=PB01DFI5GUE5FEU7';
    axios({
        method: "get",
        url: url,
    }).then(function (response){
        console.log (response);
        const stringStream = new StringStream();
        stringStream.consume(obj => console.log ("Row:", obj));
        response.send ('ok')
    })
})
app.listen(8000|| process.env.PORT)