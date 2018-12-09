const netflix = require('./../node-netflix2/lib/netflix2');
const restoreCookieJar = require('./restore-cookiejar');

module.exports = (req, res) => {
  let cookieJar = req.session.serializedCookieJar ? restoreCookieJar(req.session.serializedCookieJar) : res.status(403).send({ error: 'no session' });

  let netflixSession = netflix({
    cookieJar: cookieJar
  });

  netflixSession.login(null, () => {
    netflixSession.switchProfile(req.body.guid, (error) => {
      if (error) {
        res.status(500).send({ error: error });
      }
      else {
        res.status(200).send({ switched: true });
      }
    });
  });
};