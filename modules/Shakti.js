const request = require('request-promise');
const authGetter = require('./AuthUrl');
const restoreCookieJar = require('./RestoreCookieJar');

let doApiRequest = async (paths, req, buildIdentifier) => {
  const shaktiUrl = `https://www.netflix.com/api/shakti/${buildIdentifier}/pathEvaluator`;
  let cookieJar = restoreCookieJar(req.session.serializedCookieJar);

  if (!req.session.authUrl) {
    req.session.authUrl = await authGetter();
  }

  return request({
    uri: shaktiUrl,
    method: 'POST',
    qr: {
      drmSystem: 'widevine',
      falcor_server: '0.1.0',
      isShortformEnabled:	false,
      isVolatileBillboardsEnabled: false,
      isWatchlistEnabled:	false,
      materialize: true,
      withSize:	true,
    },
    json:    {
      authUrl: req.session.authUrl,
      paths: paths
    },
    jar: cookieJar,
  })
};

module.exports = {

  searchByEntity: async (genreId, page, perPage, req) => {
    let pager = {
      from: page * perPage,
      to: (page + 1) * perPage
    };

    let defaultQuery = ['genres', genreId, 'su'];

    try {
      let apiResponse = await doApiRequest([
        [...defaultQuery, pager, 'title', 'genres'],
        [...defaultQuery, pager, 'boxarts', '_342x192', 'jpg'],
      ], req, 'v4bf615c3');

      let videos = [];
      Object.keys(apiResponse.value.videos).forEach((videoId) => {
        let video = apiResponse.value.videos[videoId];
        videos.push({
          title: video.title,
          id: videoId,
          url: video.boxarts._342x192.jpg.url
        });
      });

      return videos;
    }
    catch (error) {
      return error;
    }
  }
};