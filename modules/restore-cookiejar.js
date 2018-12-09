const request = require('request-promise');
const toughCookie = require('tough-cookie');

module.exports = function (savedCookieJar) {
  let jar = new request.jar();

  savedCookieJar.cookies.forEach((cookieObject) => {
    let cookie = toughCookie.fromJSON(cookieObject);
    jar.setCookie(cookie, 'https://' + cookieObject.domain);
  });

  return jar;
};