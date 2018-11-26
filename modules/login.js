const netflixLogin = require('./netflix-login/login');
const netflixCrypto = require('./netflix-login/crypto');

const options = {
  useCache: false
};

module.exports = (username, password) => {
  return netflixLogin.login(username, password, options)
    .then(authData => netflixCrypto.fetchCryptoKeys(authData, options))
    .then(data => {
      if (data && data.authData && data.authData.cookieJar) {
        return data.authData.cookieJar._jar;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};