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

let getPageJSON = async (url, req) => {
  let cookieJar = restoreCookieJar(req.session.serializedCookieJar);

  if (!req.session.authUrl) {
    req.session.authUrl = await authGetter();
  }

  return request({
    uri: url,
    method: 'GET',
    jar: cookieJar,
  }).then((response) => {
    let responseSplit = response.split('netflix.reactContext =');
    let responseSplit2 = responseSplit[1].split(';</script>');
    let json = responseSplit2[0];

    // I admit I do not know what I am doing, but this works.
    // I realise that this breaks the encoding, but it gives me what I want.
    json = json.split("\x20").join(' ');
    json = json.split('\\x').join('');
    return JSON.parse(json);
  });
};

module.exports = {
  browseGenre: async (genreId, req) => {
    let pageJson = await getPageJSON('https://www.netflix.com/browse/genre/' + genreId, req);
    let buildIdentifier = pageJson.models.serverDefs.data.BUILD_IDENTIFIER;
    let paths = pageJson.models.postGateData.data;
    let apiResponse = await doApiRequest([paths[6]], req, buildIdentifier);

    let videos = [];
    Object.keys(apiResponse.value.videos).forEach((videoId) => {
      videos.push({
        url: apiResponse.value.videos[videoId].boxarts._342x192.jpg.url,
        id: videoId
      });
    });

    return videos;
  },

  searchByEntity: async (genreId, page, perPage, req) => {
    let pager = {
      from: page * perPage,
      to: (page + 1) * perPage
    };

    let defaultQuery = ['search', 'byEntity', genreId + '_genre', perPage];

    try {
      let apiResponse = await doApiRequest([
        [...defaultQuery, pager, 'reference', 'boxarts', '_342x192', 'jpg'],
        [...defaultQuery, pager, 'reference', ['title']]
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