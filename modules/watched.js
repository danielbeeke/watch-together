const request = require('request-promise');
const login = require('./login');
const viewedUrl = 'https://www.netflix.com/api/shakti/v4bf615c3/viewingactivity';

module.exports = async (username, password) => {

  return new Promise((resolve) => {
    login(username, password).then(cookieJar => {

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

        return watchedMovies;
      };

      resolve(getAllItems());
    });
  });

};