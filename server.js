import express from 'express';
const app = express();
import request from 'request';
import cors from 'cors';
app.use(cors());
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.get('/litecoin-btce', (req, res) => {
    request("https://btc-e.com/api/3/ticker/ltc_btc", function (error, response, body) {
      res.send(JSON.parse(body))
    })
});

app.get('/bitcoin-btce', (req, res) => {
    request("https://btc-e.com/api/3/ticker/btc_usd", function (error, response, body) {
      res.send(JSON.parse(body))
    })
});

app.get('/dash-poloniex', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_DASH&start=" + lastSecond, function (error, response, body) {
      res.send(JSON.parse(body))
    })
});


app.listen(port, () => {
  console.log("Listening on port ", port);
});
