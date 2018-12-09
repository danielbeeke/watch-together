'use strict';

let server = require('http').createServer(),
  url = require('url'),
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ server: server }),
  express = require('express'),
  app = express(),
  port = 8004;

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

let rooms = {};

wss.on('connection', (ws, req) => {
  let location = url.parse(req.url, true);
  let roomName = location.path;
  if (!rooms[roomName]) { rooms[roomName] = []; }
  rooms[roomName].push(ws);

  ws.on('message', (message) => {
    console.log(message)
  });

});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });