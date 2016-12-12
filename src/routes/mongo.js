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

export default (app) => {
  app.get('/mongo/litecoin_bitcoin', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('litecoin');

        collection.find({'api':'poloniex'}).sort({_id: -1}).limit(20).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/ethereum_bitcoin', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the ethereum collection: ', err);
      } else {
        console.log('Connection established to ethereum collection');
        const collection = db.collection('ethereum');

        collection.find({'api':'poloniex'}).sort({_id: -1}).limit(20).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/dash_bitcoin', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the dash collection: ', err);
      } else {
        console.log('Connection established to dash collection');
        const collection = db.collection('dash');

        collection.find({'api':'poloniex'}).sort({_id: -1}).limit(20).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });
}
