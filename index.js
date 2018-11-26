/**
 * Module includes
 */
require('dotenv').config();
const netflixLogin = require('./modules/login');
const mongoDbSessionUrl = process.env.MONGODB_URL;
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const watchedMovies = require('./modules/watched');
const shakti = require('./modules/Shakti');

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

app.get('/login', (req, res) => {
  if (req.session.serializedCookieJar) {
    res.redirect('/loading');
  }
  else {
    res.render('login', {
      user: process.env.NETFLIX_DEVELOPMENT_USER,
      pass: process.env.NETFLIX_DEVELOPMENT_PASS,
    });
  }
});

app.post('/login', (req, res) => {
  if (req.session.serializedCookieJar) {
    res.redirect('/loading');
  }
  else {
    netflixLogin(req.body.email, req.body.password).then(cookieJar => {
      if (cookieJar) {
        req.session.mail = req.body.email;
        req.session.serializedCookieJar = cookieJar.toJSON();
        res.redirect('/loading');
      }
      else {
        throw 'Something went wrong trying to login to Netflix.';
      }
    })
    .catch(() => {
      res.render('login', {
        user: process.env.NETFLIX_DEVELOPMENT_USER,
        pass: process.env.NETFLIX_DEVELOPMENT_PASS,
      });
    });
  }
});

app.get('/loading', (req, res) => {
  watchedMovies(req).then((watchedMovies) => {
    req.session.watchedMovies = watchedMovies;
    res.redirect('catalog');
  });
});

app.get('/catalog/:genreId', (req, res) => {
  shakti.browseGenre(req.params.genreId, req).then((videos) => {
    res.render('catalog', {
      jsonData: JSON.stringify(req.session.watchedMovies),
      videos: videos
    });
  }).catch((error) => {
    console.log(error)
  });
});

app.get('/api/browse/:genreId', (req, res) => {
  shakti.browseGenre(req.params.genreId, req).then((response) => {
    res.status(200).send(response);
  }).catch((error) => {
    console.log(error)
  });
});

app.listen(process.env.PORT);
