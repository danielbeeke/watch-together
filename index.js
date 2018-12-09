/**
 * Module includes
 */
require('dotenv').config();
const mongoDbSessionUrl = process.env.MONGODB_URL;
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const routing = require('./modules/routing');

/**
 * Express App
 */
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
app.engine('handlebars', handlebars({ defaultLayout: 'html' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use(expressSession({
  resave: true,
  secret: 'D0EA85FD7BFE11E1D43498F2C93655AC',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  saveUninitialized: true,
  store: new MongoDBStore({
    uri: mongoDbSessionUrl,
    databaseName: process.env.MONGODB_DATABASE,
    collection: 'sessions'
  }),
}));

/**
 * Routing is done in a separate routing.js file.
 */
new routing(app);

app.listen(process.env.PORT);
