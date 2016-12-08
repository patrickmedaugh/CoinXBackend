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

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log('Unable to connect to Mongo Server: ', err);
  } else {
    console.log('Connected to MongoDB');
  }
});


app.get('/btce/litecoin', (req, res) => {
    request("https://btc-e.com/api/3/ticker/ltc_btc", (error, response, body) => {
      const data = JSON.parse(body).ltc_btc;
      data.created_at = new Date();
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the litecoin collection: ', err);
        } else {
          console.log('Connection established to litecoin collection');
          const collection = db.collection('litecoin');
          collection.insert({api: 'btce', data: data});
        }
        db.close();
      });
      res.send(data);
    });
});

app.get('/btce/bitcoin', (req, res) => {
    request("https://btc-e.com/api/3/ticker/btc_usd", (error, response, body) => {
      const data = JSON.parse(body).btc_usd;
      data.created_at = new Date();
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the bitcoin collection: ', err);
        } else {
          console.log('Connection established to bitcoin collection');
          const collection = db.collection('bitcoin');
          collection.insert({api: 'btce', data: data});
        }
        db.close();
      });
      res.send(data);
    });
});

app.get('/btce/dash', (req, res) => {
  request("https://btc-e.com/api/3/ticker/dsh_btc", (error, response, body) => {
    const data = JSON.parse(body).dsh_btc;
    data.created_at = new Date();
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the dash collection: ', err);
      } else {
        console.log('Connection established to dash collection');
        const collection = db.collection('dash');
        collection.insert({api: 'btce', data: data});
      }
      db.close();
    });
    res.send(data);
  })
})

app.get('/btce/ethereum', (req, res) => {
  request("https://btc-e.com/api/3/ticker/eth_btc", (error, response, body) => {
    const data = JSON.parse(body).eth_btc;
    data.created_at = new Date();
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the ethereum collection: ', err);
      } else {
        console.log('Connection established to ethereum collection');
        const collection = db.collection('ethereum');
        collection.insert({api: 'btce', data: data});
      }
      db.close();
    });
    res.send(data);
  });
});

app.get('/poloniex/dash', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_DASH&start=" + lastSecond, (error, response, body) => {
      const data = JSON.parse(body);
      const avgRate = poloniex.formatAvgAttr(data, "rate");
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the dash collection: ', err);
        } else {
          console.log('Connection established to dash collection');
          const collection = db.collection('dash');
          collection.insert({api: 'poloniex', data: { rate: avgRate, created_at: new Date() }});
        }
        db.close();
      });
      res.send(avgRate);
    })
});

app.get('/poloniex/litecoin', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_LTC&start=" + lastSecond, (error, response, body) => {
      const data = JSON.parse(body);
      const avgRate = poloniex.formatAvgAttr(data, "rate");
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the litecoin collection: ', err);
        } else {
          console.log('Connection established to litecoin collection');
          const collection = db.collection('litecoin');
          collection.insert({api: 'poloniex', data: { rate: avgRate, created_at: new Date() }});
        }
        db.close();
      });
      res.send(avgRate);
    })
});

app.get('/poloniex/ethereum', (req, res) => {
    const lastSecond = (new Date().getTime() / 1000) - 1000;
    request("https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_ETH&start=" + lastSecond, (error, response, body) => {
      const data = JSON.parse(body);
      const avgRate = poloniex.formatAvgAttr(data, "rate");
      MongoClient.connect(mongoUrl, (err, db) => {
        if (err) {
          console.log('Unable to connect to the ethereum collection: ', err);
        } else {
          console.log('Connection established to ethereum collection');
          const collection = db.collection('ethereum');
          collection.insert({api: 'poloniex', data: { rate: avgRate, created_at: new Date() }});
        }
        db.close();
      });
      res.send(avgRate);
    })
});

app.get('/chart/litecoin', (req, res) => {
  MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log('Unable to connect to the litecoin collection: ', err);
  } else {
    console.log('Connection established to litecon collection');
    const collection = db.collection('litecoin');

    collection.find({'api':'poloniex'}).limit(20).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.json(result);
      } else {
        res.send('No documents found');
      }
      db.close();
    });
  }
  });

});

app.get('/chart/ethereum', (req, res) => {
  MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log('Unable to connect to the ethereum collection: ', err);
  } else {
    console.log('Connection established to ethereum collection');
    const collection = db.collection('ethereum');

    collection.find({'api':'poloniex'}).limit(20).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.json(result);
      } else {
        res.send('No documents found');
      }
      db.close();
    });
  }
  });
});

app.get('/chart/dash', (req, res) => {
  MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log('Unable to connect to the dash collection: ', err);
  } else {
    console.log('Connection established to dash collection');
    const collection = db.collection('dash');

    collection.find({'api':'poloniex'}).limit(20).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.json(result);
      } else {
        res.send('No documents found');
      }
      db.close();
    });
  }
  });
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
