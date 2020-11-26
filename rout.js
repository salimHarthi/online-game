const express = require("express");
const routs = express();
const sub = require("./subscribers/otp");
const game = require("./entities/game/service");
routs.get("/game/:otp/:id", sub.validOtp, (req, res) => {
  res.sendFile(__dirname + "/static/game.html");
});

routs.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

routs.get("/otp", game.generatRoomToken);

module.exports = routs;
