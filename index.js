const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 3000;
const ip = "localhost";
app.use(cors());

app.use(express.static(path.join(__dirname, "static")));

const server = app.listen(port, ip, function (error) {
  if (error) {
    console.log.error("Unable to listen for connections", error);
    process.exit(10);
  }
  console.log("express is listening on http://" + ip + ":" + port);
});
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("connect");
  socket.on("room", (room) => {
    socket.join(room);
    console.log(io.sockets.adapter.rooms.get(room).size);
  });

  socket.on("move", (data) => {
    socket.to(data.id).broadcast.emit("move", data);
  });
  socket.on("crash", (data) => {
    io.to(data.id).emit("crash", data);
    //io.emit("crash", data);
  });
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.get("/game/:id", (req, res) => {
  res.sendFile(__dirname + "/static/game.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});
