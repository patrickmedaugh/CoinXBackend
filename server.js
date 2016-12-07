import express from 'express'
const app = express();
import 'isomorphic-fetch';
const bodyParser = require('body-parser');
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

router.get('/litecoin-btce', function(req, res) {
    fetch("http://www.flickr.com/services/feeds/photos_public.gne?tags=soccer&format=json")
    .then((response) => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ')
      console.log(JSON.parse(response));
      return;
    }
    console.log(response);
    console.log('-=-=-=-=-=-AYYYY-=-=-=-=-=-=-');
    response.json().then(function(data) {
      console.log(data);
    });
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  res.json(response);
});

app.get('/bitcoin-btce', function(req, res) {
    var thing;
    /*
    fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      if (response.ok) {
        thing = "at least this works";
      }
    })
    */
    res.send(JSON.stringify({test:thing}));
});

app.listen(port);
console.log("Listening on port ", port);
