/**
 * Module includes
 */
require('dotenv').config();
const netflixLogin = require('./modules/login');
const mongoDbSessionUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}?retryWrites=true`;
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const watchedMovies = require('./modules/watched');

/**
 * Express App
 */
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));
app.engine('handlebars', handlebars({ defaultLayout: 'html' }));
app.set('view engine', 'handlebars');
app.use(expressSession({
  secret: 'D0EA85FD7BFE11E1D43498F2C93655AC',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: new MongoDBStore({
    uri: mongoDbSessionUrl,
    databaseName: process.env.MONGODB_DATABASE,
    collection: 'sessions'
  }),
  resave: true,
  saveUninitialized: true,
}));

/**
 * Routing
 */
app.get('/', (req, res) => res.render('welcome'));

let getWatchedMovies = (req, callback) => {
  watchedMovies(req.session.cookieJar).then( (watchedMovies) => {
    console.log(watchedMovies);
    callback();
  })
};


app.get('/login', (req, res) => {
  if (req.session.cookieJar) {
    getWatchedMovies(req, () =>{
      res.redirect('/loading');
    });
  }
  else {
    res.render('login', {
      user: process.env.NETFLIX_DEVELOPMENT_USER,
      pass: process.env.NETFLIX_DEVELOPMENT_PASS,
    });
  }
});

app.post('/login', (req, res) => {
  if (req.session.cookieJar) {
    getWatchedMovies(req, () =>{
      res.redirect('/loading');
    });
  }
  else {
    netflixLogin(req.body.email, req.body.password).then(cookieJar => {
      req.session.mail = req.body.email;
      req.session.cookieJar = cookieJar.toJSON();

      getWatchedMovies(req, () =>{
        res.redirect('/loading');
      });
    })
    .catch(error => {
      res.render('login', {
        user: process.env.NETFLIX_DEVELOPMENT_USER,
        pass: process.env.NETFLIX_DEVELOPMENT_PASS,
      });
    });
  }
});

app.get('/catalog', (req, res) => res.render('catalog'));


app.listen(process.env.PORT);
