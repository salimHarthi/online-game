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

    socket.on("move", (data) => {
      socket.broadcast.emit("move",data)
      //io.emit('move', data);
    });

})

  app.use(function (req, res, next) {
    req.io = io;
    next();
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
   });
   
 