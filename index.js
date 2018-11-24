require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const login = require('./modules/login');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
app.engine('handlebars', handlebars({ defaultLayout: 'html' }));
app.set('view engine', 'handlebars');
const port = 5000;

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, mongo) {
  if (err) throw err;
  let dbo = mongo.db(process.env.DATABASE);
  dbo.createCollection('viewed_movies', function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    mongo.close();
  });
});

app.get('/', (req, res) => res.render('welcome'));

app.get('/login', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
  login(req.body.email, req.body.password).then(cookieJar => {
    // TODO save cookiejar with mongodb, check how the caching works inside netflix-login
    console.log(cookieJar)
    console.log('success');
    res.redirect('loading');
  })
  .catch(error => {
    console.log(error);
    res.render('login');
  });
});

app.get('/:roomName', (req, res) => res.send(req.params.roomName));

app.listen(port);

/*
const watched = require('./modules/watched');



const username = process.env.USERNAME;
const password = process.env.PASSWORD;

watched(username, password).then(watchedMovies => {
  console.log(watchedMovies)
});
*/