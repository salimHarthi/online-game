const express = require("express");
const path = require("path");
const app = express();
const Room = require("./game/room");
const port = process.env.PORT || 3000;

//Room.validateToken(Room.createRoomToken("a"),"a")

app.use(express.static(path.join(__dirname, "static")));

const server = app.listen(port, function (error) {
  if (error) {
    console.log.error("Unable to listen for connections", error);
    process.exit(10);
  }
  console.log("express is listening on http://" + ":" + port);
});
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("connect");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("checkRoom", (room) => {
    if (!Room.roomExist(io.sockets.adapter.rooms.get(room))) {
      return socket.emit("checkRoom", "room does not exist");
    }
    roomSize = io.sockets.adapter.rooms.get(room).size;
    if (!Room.roomLimit(roomSize, room)) {
      socket.emit("checkRoom", "room is full");
    } else {
      socket.emit("RoomAvailable", "Room available");
    }
  });

  socket.on("room", (room) => {
    socket.join(room);
    console.log(room, io.sockets.adapter.rooms.get(room).size);
  });

  socket.on("move", (data) => {
    socket.to(data.id).broadcast.emit("move", data);
  });
  socket.on("crash", (data) => {
    io.to(data.id).emit("crash", data);
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
