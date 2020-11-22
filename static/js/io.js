$(document).ready(function () {
  const socket = io("http://localhost:3000/");
  const url = window.location.pathname;
  const roomId = url.substring(url.lastIndexOf("/") + 1);
  // connection setup
  socket.on("connect", () => {
    // either with send()
    socket.emit("room", roomId);
  });

  class Otherplayer {
    move(data) {
      ctx.clearRect(data.postionX.old, data.postionY.old, PIXELSIZE, PIXELSIZE);
      ctx.fillRect(data.postionX.new, data.postionY.new, PIXELSIZE, PIXELSIZE);
    }
  }
  class Player {
    constructor(name) {
      //this.color = color;
      this.name = name;
    }
    move(key) {
      postionX.old = postionX.new;
      postionY.old = postionY.new;
      switch (key.charCode) {
        case a:
          postionX.new -= PIXELSIZE;
          break;
        case s:
          postionY.new += PIXELSIZE;
          break;
        case w:
          postionY.new -= PIXELSIZE;
          break;
        case d:
          postionX.new += PIXELSIZE;
          break;
        default:
      }
      postionX.new = postionX.new < 0 ? 0 : postionX.new;
      postionY.new = postionY.new < 0 ? 0 : postionY.new;
      postionX.new = postionX.new > widthMax ? widthMax : postionX.new;
      postionY.new = postionY.new > hightMax ? hightMax : postionY.new;

      ctx.clearRect(postionX.old, postionY.old, PIXELSIZE, PIXELSIZE);
      ctx.fillRect(postionX.new, postionY.new, PIXELSIZE, PIXELSIZE);
      socket.emit("move", {
        postionX: postionX,
        postionY: postionY,
        name: this.name,
        id: roomId,
      });
    }
  }

  // setup
  let myplayer = new Player("salim");
  let player2 = new Otherplayer();
  let canvas = $("#myCanvas");
  let ctx = canvas.get(0).getContext("2d");
  let canvasWidth = canvas.width();
  let canvasHeight = canvas.height();
  let DIMENSION = 25;
  let PIXELSIZE = canvasWidth / DIMENSION;
  let selectedColor = "#222244";
  let enabled = true;
  let filledPixels = {};
  let postionX = { old: 0, new: 0 };
  let postionY = { old: 0, new: 0 };
  let widthMax = canvasWidth - PIXELSIZE;
  let hightMax = canvasHeight - PIXELSIZE;
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  for (let i = 0; i < DIMENSION; ++i) {
    x = Math.floor((i * canvasWidth) / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();

    y = Math.floor((i * canvasHeight) / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }
  ctx.fillRect(postionX.old, postionY.old, PIXELSIZE, PIXELSIZE);

  // key setup
  const a = 97;
  const s = 115;
  const w = 119;
  const d = 100;

  $(document).on("keypress", function (e) {
    myplayer.move(e);
  });

  $(function () {
    socket.on("move", function (move) {
      console.log(move.postionX.new);
      player2.move(move);
      crash(move);
    });
    socket.on("crash", function () {
      alert("crashed");
    });
  });

  const crash = (other) => {
    if (
      other.postionX.new == postionX.new &&
      other.postionY.new == postionY.new
    ) {
      socket.emit("crash", {
        postionX: postionX,
        postionY: postionY,
        name: this.name,
        id: roomId,
      });
    }
  };
});
