require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
app.use(express.static('static'));
app.engine('handlebars', handlebars({ defaultLayout: 'html' }));
app.set('view engine', 'handlebars');
const port = 5000;

app.get('/', (req, res) => res.render('welcome'));
app.get('/:roomName', (req, res) => res.send(req.params.roomName));

app.listen(port);

/*
const watched = require('./modules/watched');

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, mongo) {
  if (err) throw err;
  let dbo = mongo.db(process.env.DATABASE);
  dbo.createCollection('viewed_movies', function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

watched(username, password).then(watchedMovies => {
  console.log(watchedMovies)
});
*/