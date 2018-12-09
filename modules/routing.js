const login = require('./login');
const getProfiles = require('./get-profiles');
const getActiveProfile = require('./get-active-profile');
const getWatched = require('./get-watched');
const chooseProfile = require('./choose-profile');
const browse = require('./browse');

module.exports = function (app) {
  app.get('/', (req, res) => res.render('app'));
  app.get('/api/profiles', getProfiles);
  app.get('/api/get-watched', getWatched);
  app.get('/api/get-active-profile', getActiveProfile);
  app.get('/api/browse/:genreId/:page/:perPage', browse);
  app.post('/api/choose-profile', chooseProfile);
  app.post('/api/login', login);
};