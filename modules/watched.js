const request = require('request-promise');
const viewedUrl = 'https://www.netflix.com/api/shakti/v4bf615c3/viewingactivity';
const restoreCookieJar = require('./RestoreCookieJar');

module.exports = async (req) => {
  let cookieJar = restoreCookieJar(req.session.serializedCookieJar);

  return new Promise((resolve) => {
    let watchedMovies = [];
    let currentPage = 0;
    let totalItems = 20;

    let getPage = (pageNumber) => {
      return request(viewedUrl, {
        qs: { pg: pageNumber },
        jar: cookieJar,
      }).then(result => {
        let data = JSON.parse(result);
        totalItems = data.vhSize;
        return data.viewedItems;
      });
    };

    let getAllItems = async () => {
      while (watchedMovies.length < totalItems) {
        let newItems = await getPage(0);
        watchedMovies = [...watchedMovies, ...newItems];
        currentPage++;
      }

      return watchedMovies.map((movie) => movie.movieID);
    };

    resolve(getAllItems());
  });

};