const request = require('request-promise');

const baseOptions = {
  uri: 'https://www.netflix.com/Login',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586',
  },
  jar: request.jar(),
};

let authUrl = false;

module.exports = () => {
  if (authUrl) {
    Promise.resolve(authUrl);
  }
  else {
    return request(baseOptions).then((body) => {
      return body.match(/name="authURL" value="(.+?)"/)[1];
    })
    .catch((err) => {
      throw new Error(`netflix-login: Couldn't retrieve authURL ${err}`);
    });
  }
};
