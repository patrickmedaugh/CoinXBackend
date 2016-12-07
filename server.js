import express from 'express';
const app = express();
import request from 'request';
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.get('/litecoin-btce', function(req, res) {
    request("https://btc-e.com/api/3/ticker/btc_usd", function (error, response, body) {
      console.log(typeof body);
      res.send(body)
    })
});

app.get('/bitcoin-btce', function(req, res) {
    var thing;
    /*
    fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      if (response.ok) {
        thing = "at least this works";
      }
    })
    */
    res.send(JSON.stringify({newkidsontheblock: "sucking a lot of dick"}));
});

app.listen(port);
console.log("Listening on port ", port);
