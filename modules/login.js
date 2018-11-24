const netflixLogin = require('./netflix-login/login');
const netflixCrypto = require('./netflix-login/crypto');

const options = {
  useCache: false
};

module.exports = (username, password) => {
  return netflixLogin.login(username, password, options)
    .then(authData => netflixCrypto.fetchCryptoKeys(authData, options))
    .then(data => {
      return data.authData.cookieJar._jar.store.idx['netflix.com']['/'];
    })
    .catch((error) => {
      console.error('ERROR');
      console.error(error);
    });
};