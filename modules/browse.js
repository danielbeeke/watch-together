const netflix = require('./../node-netflix2/lib/netflix2');
const restoreCookieJar = require('./restore-cookiejar');

module.exports = (req, res) => {
  let cookieJar = req.session.serializedCookieJar ? restoreCookieJar(req.session.serializedCookieJar) : res.status(403).send({ error: 'no session' });

  let netflixSession = netflix({
    cookieJar: cookieJar
  });

  netflixSession.login(null, () => {
    netflixSession.browse(req.params.genreId, req.params.page, req.params.perPage, (error, response) => {

      let videos = [];
      Object.keys(response.value.videos).forEach((videoId) => {
        let video = response.value.videos[videoId];
        videos.push({
          title: video.title,
          id: parseInt(videoId),
          url: video.boxarts._342x192.jpg.url
        });
      });

      res.status(200).send(videos);
    });
  });
};