import express from 'express';
import { poloniex } from '../poloniexService.js';
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

export default function(app) {
  app.get('/poloniex/dash_bitcoin', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_DASH&start=" + lastSecond, (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body);
      const avgRate = poloniex.formatAvgAttr(data, "rate");
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the dash collection: ', err);
        } else {
          console.log('Connection established to dash collection');
          const collection = db.collection('dash');
          collection.insert({api: 'poloniex', data: { rate: avgRate }, created_at: new Date() });
        }
        db.close();
      });
      res.send(avgRate);
    })
  });

  app.get('/poloniex/litecoin_bitcoin', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_LTC&start=" + lastSecond, (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body);
      const avgRate = poloniex.formatAvgAttr(data, "rate");
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the litecoin collection: ', err);
        } else {
          console.log('Connection established to litecoin collection');
          const collection = db.collection('litecoin');
          collection.insert({api: 'poloniex', data: { rate: avgRate }, created_at: new Date() });
        }
        db.close();
      });
      res.send(avgRate);
    })
  });

  app.get('/poloniex/ethereum_bitcoin', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_ETH&start=" + lastSecond, (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body);
      const avgRate = poloniex.formatAvgAttr(data, "rate");
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the ethereum collection: ', err);
        } else {
          console.log('Connection established to ethereum collection');
          const collection = db.collection('ethereum');
          collection.insert({api: 'poloniex', data: { rate: avgRate }, created_at: new Date() });
        }
        db.close();
      });
      res.send(avgRate);
    })
  });
}
