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

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log('Unable to connect to Mongo Server: ', err);
  } else {
    console.log('Connected to MongoDB');
  }
});
