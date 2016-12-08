import express from 'express';
import { poloniex } from './src/poloniexService.js';
import request from 'request';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.get('/btce/litecoin', (req, res) => {
    request("https://btc-e.com/api/3/ticker/ltc_btc", (error, response, body) => {
      res.send(JSON.parse(body))
    })
});

app.get('/btce/bitcoin', (req, res) => {
    request("https://btc-e.com/api/3/ticker/btc_usd", (error, response, body) => {
      res.send(JSON.parse(body))
    })
});

app.get('/poloniex/dash', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_DASH&start=" + lastSecond, (error, response, body) => {
      const avgRate = poloniex.formatAvg(JSON.parse(body));
      res.send(avgRate);
    })
});

app.get('/poloniex/litecoin', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_LTC&start=" + lastSecond, (error, response, body) => {
      const avgRate = poloniex.formatAvg(JSON.parse(body));
      res.send(avgRate);
    })
});

app.get('/poloniex/ethereum', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_ETH&start=" + lastSecond, (error, response, body) => {
      const avgRate = poloniex.formatAvg(JSON.parse(body));
      res.send(avgRate);
    })
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
