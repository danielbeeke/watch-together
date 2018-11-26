const request = require('request-promise');
const shaktiUrl = 'https://www.netflix.com/api/shakti/v4bf615c3/pathEvaluator';
const authGetter = require('./AuthUrl');

module.exports = async (req, cookieJar) => {

  if (!req.session.authUrl) {
    req.session.authUrl = await authGetter();
  }

  return request({
    uri: shaktiUrl,
    method: 'POST',
    json:    {
      authUrl: req.session.authUrl,
      paths: [
        [
          "videos",
          [80167481],
          10
        ]
      ]
    },
    jar: cookieJar,
  }).catch((error) => {
    console.log(error)
  })

};