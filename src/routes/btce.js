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
  app.get('/btce/litecoin_bitcoin', (req, res) => {
    request("https://btc-e.com/api/3/ticker/ltc_btc", (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body).ltc_btc;
      data.created_at = new Date();
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the litecoin collection: ', err);
        } else {
          console.log('Connection established to litecoin collection');
          const collection = db.collection('litecoin');
          collection.insert({api: 'btce', exchange: 'bitcoin', data: data, created_at: new Date()});
        }
        db.close();
      });
      res.send(data);
    });
  });

  app.get('/btce/bitcoin_usd', (req, res) => {
    request("https://btc-e.com/api/3/ticker/btc_usd", (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body).btc_usd;
      data.created_at = new Date();
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the bitcoin collection: ', err);
        } else {
          console.log('Connection established to bitcoin collection');
          const collection = db.collection('bitcoin');
          collection.insert({api: 'btce', exchange: 'bitcoin',  data: data, created_at: new Date()});
        }
        db.close();
      });
      res.send(data);
    });
  });

  app.get('/btce/dash_bitcoin', (req, res) => {
    request("https://btc-e.com/api/3/ticker/dsh_btc", (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body).dsh_btc;
      data.created_at = new Date();
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the dash collection: ', err);
        } else {
          console.log('Connection established to dash collection');
          const collection = db.collection('dash');
          collection.insert({api: 'btce', exchange: 'bitcoin',  data: data, created_at: new Date()});
        }
        db.close();
      });
      res.send(data);
    })
  })

  app.get('/btce/ethereum_bitcoin', (req, res) => {
    request("https://btc-e.com/api/3/ticker/eth_btc", (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body).eth_btc;
      data.created_at = new Date();
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the ethereum collection: ', err);
        } else {
          console.log('Connection established to ethereum collection');
          const collection = db.collection('ethereum');
          collection.insert({api: 'btce', exchange: 'bitcoin',  data: data, created_at: new Date()});
        }
        db.close();
      });
      res.send(data);
    });
  });

  app.get('/btce/litecoin_usd', (req, res) => {
    request("https://btc-e.com/api/3/ticker/ltc_usd", (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body).ltc_usd;
      data.created_at = new Date();
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the litecoin collection: ', err);
        } else {
          console.log('Connection established to litecoin collection');
          const collection = db.collection('litecoin');
          collection.insert({api: 'btce', exchange: 'usd',  data: data, created_at: new Date()});
        }
        db.close();
      });
      res.send(data);
    });
  });

  app.get('/btce/dash_usd', (req, res) => {
    request("https://btc-e.com/api/3/ticker/dsh_usd", (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body).dsh_usd;
      data.created_at = new Date();
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the dash collection: ', err);
        } else {
          console.log('Connection established to dash collection');
          const collection = db.collection('dash');
          collection.insert({api: 'btce', exchange: 'usd',  data: data, created_at: new Date()});
        }
        db.close();
      });
      res.send(data);
    })
  })

  app.get('/btce/ethereum_usd', (req, res) => {
    request("https://btc-e.com/api/3/ticker/eth_usd", (error, response, body) => {
      if (error) {
        res.send(error)
      }
      const data = JSON.parse(body).eth_usd;
      data.created_at = new Date();
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the ethereum collection: ', err);
        } else {
          console.log('Connection established to ethereum collection');
          const collection = db.collection('ethereum');
          collection.insert({api: 'btce', exchange: 'usd',  data: data, created_at: new Date()});
        }
        db.close();
      });
      res.send(data);
    });
  });

};
