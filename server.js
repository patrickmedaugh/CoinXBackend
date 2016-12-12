import express from 'express';
import { poloniex } from './src/poloniexService.js';
import request from 'request';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';
import btceService from './src/routes/btce.js';
import poloniexService from './src/routes/poloniex.js';
import mongoService from './src/routes/mongo.js';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017/currency'

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log('Unable to connect to Mongo Server: ', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

btceService(app);
poloniexService(app);
mongoService(app);

app.listen(port, () => {
  console.log("Listening on port ", port);
});
