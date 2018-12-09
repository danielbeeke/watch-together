const request = require('request-promise');
const netflix = require('./../node-netflix2/lib/netflix2');
const restoreCookieJar = require('./restore-cookiejar');

module.exports = (req, res) => {
  let cookieJar = req.session.serializedCookieJar ? restoreCookieJar(req.session.serializedCookieJar) : request.jar();

  let netflixSession = netflix({
    cookieJar: cookieJar
  });

  let netflix2Settings = false;

  // If we had a session: we only start node-netflix2 else we also login.
  if (!req.session.serializedCookieJar) {
    netflix2Settings = {
      email: req.body.email,
      password: req.body.password,
    };
  }

  // We login.
  netflixSession.login(netflix2Settings, () => {

    if (!req.session.serializedCookieJar) {
      req.session.serializedCookieJar = cookieJar._jar.toJSON();
    }

    netflixSession.getActiveProfile((error, profile) => {
      let httpCode = error ? 403 : 200;

      let response = httpCode === 403 ? { loggedIn: false, profile: false, error: error } : { loggedIn: true, profile: profile };

      res.status(httpCode).send(response);
    });
  });
};