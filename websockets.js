'use strict';

let server = require('http').createServer(),
  url = require('url'),
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ server: server }),
  express = require('express'),
  app = express(),
  port = 8003;

app.use(function (req, res) {
  res.send({ msg: '-' });
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
    watched: [],
    profile: false
  };

  rooms[roomName].push(currentPeer);

  let broadcast = () => {
    let roomData = rooms[roomName].map(peer => {
      return {
        watched: peer.watched,
        profile: peer.profile
      }
    });

    rooms[roomName].forEach(peerData => {
      peerData.ws.send(JSON.stringify(roomData));
    });
  };

  ws.on('message', (message) => {
    message = JSON.parse(message);
    currentPeer.watched = message.watched;
    currentPeer.profile = message.profile;
    broadcast();
  });

  ws.on('close', () => {
    let index = rooms[roomName].indexOf(currentPeer);
    delete rooms[roomName][index];
  });
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });