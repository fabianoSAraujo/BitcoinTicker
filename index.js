const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const request = require('request');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
  
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var baseURL = 'https://www.bitstamp.net/api/ticker/';

  request(`${baseURL}${crypto}${fiat}`, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.last;

    res.write(`<h1> The current price of ${crypto} is ${price} ${fiat} </h1>`);
  res.send();
  })

});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
