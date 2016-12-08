import express from 'express';
import { poloniex } from './src/poloniexService.js';
import request from 'request';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017/currency'
let litecoinCollect;
let bitcoinCollect;
let ethereumCollect;
let dashCollect;
MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log('Unable to connect to Mongo Server: ', err);
  } else {
    console.log('Connected to MongoDB');
     litecoinCollect  = db.collection('litecoin');
     bitcoinCollect   = db.collection('bitcoin');
     ethereumCollect  = db.collection('ethereum');
     dashCollect      = db.collection('dash');
  }
});

app.get('/btce/litecoin', (req, res) => {
    request("https://btc-e.com/api/3/ticker/ltc_btc", (error, response, body) => {
      const data = JSON.parse(body);
      data.created_at = new Date();
      litecoinCollect.insert({api: 'btce', data: data.ltc_btc});
      res.send(data);
    });
});

app.get('/btce/bitcoin', (req, res) => {
    request("https://btc-e.com/api/3/ticker/btc_usd", (error, response, body) => {
      const data = JSON.parse(body);
      data.created_at = new Date();
      bitcoinCollect.insert({api: 'btce', data: data.btc_usd});
      res.send(data);
    });
});

app.get('/btce/dash', (req, res) => {
  request("https://btc-e.com/api/3/ticker/dsh_btc", (error, response, body) => {
    const data = JSON.parse(body);
    data.created_at = new Date();
    dashCollect.insert({api: 'btce', data: data});
    res.send(data);
  })
})

app.get('/btce/ethereum', (req, res) => {
  request("https://btc-e.com/api/3/ticker/eth_btc", (error, response, body) => {
    const data = JSON.parse(body);
    data.created_at = new Date();
    ethereumCollect.insert({api: 'btce', data: data});
    res.send(data);
  });
});

app.get('/poloniex/dash', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_DASH&start=" + lastSecond, (error, response, body) => {
      const data = JSON.parse(body);
      const avgRate = poloniex.formatAvgAttr(data, "rate");
      dashCollect.insert({api: 'poloniex', data: { rate: avgRate, created_at: new Date() }});
      res.send(avgRate);
    })
});

app.get('/poloniex/litecoin', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_LTC&start=" + lastSecond, (error, response, body) => {
      const data = JSON.parse(body);
      const avgRate = poloniex.formatAvgAttr(data, "rate");
      litecoinCollect.insert({api: 'poloniex', data: { rate: avgRate, created_at: new Date() }});
      res.send(avgRate);
    })
});

app.get('/poloniex/ethereum', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_ETH&start=" + lastSecond, (error, response, body) => {
      const data = JSON.parse(body);
      const avgRate = poloniex.formatAvgAttr(data, "rate");
      ethereumCollect.insert({api: 'poloniex', data: { rate: avgRate, created_at: new Date() }});
      res.send(avgRate);
    })
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
