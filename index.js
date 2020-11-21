const express = require('express')
const path = require('path')
const app = express();
const cors = require("cors");
const port = 3000
const ip = "localhost"
app.use(cors());

app.use(express.static(path.join(__dirname, "static")));

  const server  = app.listen(port, ip, function (
    error
  ) {
    if (error) {
      console.log.error("Unable to listen for connections", error);
      process.exit(10);
    }
    console.log(
      "express is listening on http://" +
        ip +
        ":" +
        port
    );
  });
  const io = require('socket.io')(server);
  io.on("connection", (socket) => {
    console.log("connect")
    io.emit('chat message', "test");
    socket.on("storeClientInfo", function (data) {
      data.Interest = data.Interest.split(",");
      for (let item of data.Interest) {
        socket.join(item);
      }
    });
  });
  app.use(function (req, res, next) {
    req.io = io;
    next();
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
   });
   
   app.get('/test', (req, res) => {
    io.emit('chat message', "test");
    res.send("done")
   });