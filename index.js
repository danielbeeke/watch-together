/**
 * Module includes
 */
require('dotenv').config();
const netflixLogin = require('./modules/login');
const MongoClient = require('mongodb').MongoClient;
const mongoDbUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/test?retryWrites=true`;
const mongoDbSessionUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}?retryWrites=true`;
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);

/**
 * Express App
 */
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

console.log(mongoDbSessionUrl);
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
 * Globals
 */
let mongoDb;
let mongoDbClient;

/**
 * Routing
 */
app.get('/', (req, res) => res.render('welcome'));

app.get('/login', (req, res) => {
  var hour = 3600000;
  req.session.cookie.expires = new Date(Date.now() + hour);
  req.session.cookie.maxAge = hour;

  console.log(req.sessionID);
  req.session.test = 'hoi';
  mongoDbClient.findOne({ session: req.sessionID })
  .then((existingUser) => {
    if (existingUser) {
      res.redirect('/loading');
    }
    else {
      res.render('login', {
        user: process.env.NETFLIX_DEVELOPMENT_USER,
        pass: process.env.NETFLIX_DEVELOPMENT_PASS,
      })
    }
  })
  .catch ((error) => {
    console.log(error);

    res.render('login', {
      user: process.env.NETFLIX_DEVELOPMENT_USER,
      pass: process.env.NETFLIX_DEVELOPMENT_PASS,
    })
  })
});

app.post('/login', (req, res) => {
  let getWatchedMovies = (cookieJar) => {
    console.log('Everything worked');
  };

  mongoDbClient.findOne({ mail: req.body.email })
  .then((existingUser) => {
    if (existingUser) {
      // to do: what if password is changed or netflix deleted sessionasd
      getWatchedMovies(existingUser.cookieJar);
    }
    else {
      netflixLogin(req.body.email, req.body.password).then(cookieJar => {
        req.session.regenerate(function(error) {
          if (!error) {
            mongoDbClient.insertOne({
              mail: req.body.email,
              cookieJar: cookieJar,
              session: req.sessionID
            }).then( (result) => {
              if (result.insertedId) {
                getWatchedMovies(cookieJar);
              }
              else{
                console.log("return mongodb didn't answer valid");
              }
            }).catch((error) => {
              console.log(error)
            });
          }
        });
      })
      .catch(error => {
        console.log("return invalid login/pass");
      });
    }
  }).catch((error) => {
    console.log(error)
  });

  res.render('login', {
    user: process.env.NETFLIX_DEVELOPMENT_USER,
    pass: process.env.NETFLIX_DEVELOPMENT_PASS,
  });
});


/**
 * Start database and if connected start express.
 */
MongoClient.connect(mongoDbUrl, { useNewUrlParser: true }, function(error, mongo) {
  if (error) throw error;
  mongoDb = mongo;

  try {
    mongoDbClient = mongoDb.db(process.env.MONGODB_DATABASE).collection('accounts');
  }
  catch (error) {
    console.log(error)
  }

  app.listen(process.env.PORT);
});


let gracefulShutdown = () => {
  if (mongoDb) mongoDb.close();
  console.log('System closed...')
};

// This will handle process.exit():
process.on('exit', gracefulShutdown);

// This will handle kill commands, such as CTRL+C:
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// This will prevent dirty exit on code-fault crashes:
process.on('uncaughtException', (error) => {
  console.log(error);
  gracefulShutdown();
});

console.log('App started...');