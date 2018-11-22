let netflixLogin = require('./netflix-login/login');
let netflixCrypto = require('./netflix-login/crypto');

const options = {
  useCache: true,
  cachePath: './tmp',
};

module.exports = (username, password) => {
  return netflixLogin.login(username, password, options)
    .then(authData => netflixCrypto.fetchCryptoKeys(authData, options))
    .then(data => {
      return data.authData.cookieJar;
    })
    .catch((error) => {
      console.error('ERROR');
      console.error(error);
    });
};