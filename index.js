require('dotenv').config();
let watched = require('./modules/watched');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

watched(username, password).then(watchedMovies => {
  console.log(watchedMovies)
});