'use strict';

let server = require('http').createServer(),
  url = require('url'),
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ server: server }),
  express = require('express'),
  app = express(),
  port = 8003;

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

let rooms = {};

wss.on('connection', (ws, req) => {
  let location = url.parse(req.url, true);
  let roomName = location.path;
  if (!rooms[roomName]) {
    rooms[roomName] = [];
  }

  let currentPeer = {
    ws: ws,
    videos: []
  };

  rooms[roomName].push(currentPeer);

  let broadcast = () => {
    let totalVideos = new Set();

    rooms[roomName].forEach(peerData => {
      peerData.videos.forEach(videoId => {
        totalVideos.add(videoId);
      });
    });

    rooms[roomName].forEach(peerData => {
      peerData.ws.send(Array.from(totalVideos.values()).join(','));
    });
  };

  ws.on('message', (videosString) => {
    currentPeer.videos = videosString.split(',').map(videoId => parseInt(videoId));
    broadcast();
  });

});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });