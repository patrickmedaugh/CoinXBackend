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

  app.get('/mongo/btce/litecoin_bitcoin', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('litecoin');

        collection.find({'api': 'btce', 'exchange': 'bitcoin'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result[0].data);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/btce/ethereum_bitcoin', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('ethereum');

        collection.find({'api': 'btce', 'exchange': 'bitcoin'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result[0].data);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/btce/dash_bitcoin', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('dash');

        collection.find({'api': 'btce', 'exchange': 'bitcoin'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result[0].data);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/poloniex/litecoin_bitcoin', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('litecoin');

        collection.find({'api': 'poloniex', 'exchange': 'bitcoin'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            const avgRate = poloniex.formatAvgAttr(result, "rate");
            res.send(avgRate);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/poloniex/ethereum_bitcoin', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('ethereum');

        collection.find({'api': 'poloniex', 'exchange': 'bitcoin'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            const avgRate = poloniex.formatAvgAttr(result, "rate");
            res.send(avgRate);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/poloniex/dash_bitcoin', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('dash');

        collection.find({'api': 'poloniex', 'exchange': 'bitcoin'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            const avgRate = poloniex.formatAvgAttr(result, "rate");
            res.send(avgRate);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/btce/litecoin_usd', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('litecoin');

        collection.find({'api': 'btce', 'exchange': 'usd'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result[0].data);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/btce/ethereum_usd', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('ethereum');

        collection.find({'api': 'btce', 'exchange': 'usd'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result[0].data);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/btce/dash_usd', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('dash');

        collection.find({'api': 'btce', 'exchange': 'usd'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result[0].data);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/btce/bitcoin_usd', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('bitcoin');

        collection.find({'api': 'btce', 'exchange': 'usd'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.send(result[0].data);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/poloniex/litecoin_usd', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('litecoin');

        collection.find({'api': 'poloniex', 'exchange': 'usd'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            const avgRate = poloniex.formatAvgAttr(result, "rate");
            res.send(avgRate);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/poloniex/ethereum_usd', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('ethereum');

        collection.find({'api': 'poloniex', 'exchange': 'usd'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            const avgRate = poloniex.formatAvgAttr(result, "rate");
            res.send(avgRate);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });

  app.get('/mongo/poloniex/dash_usd', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the litecoin collection: ', err);
      } else {
        console.log('Connection established to litecoin collection');
        const collection = db.collection('dash');

        collection.find({'api': 'poloniex', 'exchange': 'usd'}).sort({_id: -1}).limit(1).toArray((err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length) {
            const avgRate = poloniex.formatAvgAttr(result, "rate");
            res.send(avgRate);
          } else {
            res.send('No documents found');
          }
          db.close();
        });
      }
    });
  });


}
