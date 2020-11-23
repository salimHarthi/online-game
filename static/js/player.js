const url = window.location.pathname;
const roomId = url.substring(url.lastIndexOf("/") + 1);
class Otherplayer {
  move(data) {
    ctx.fillStyle = "red";
    ctx.clearRect(data.postionX.old, data.postionY.old, PIXELSIZE, PIXELSIZE);
    ctx.fillRect(data.postionX.new, data.postionY.new, PIXELSIZE, PIXELSIZE);
  }
}
class Player {
  constructor(name) {
    this.myStartPoint = this.startPoint();
    this.name = name;
  }
  startPoint() {
    let magicW = widthMax / PIXELSIZE;
    let magicH = hightMax / PIXELSIZE;
    return [
      Math.floor(Math.random() * magicW) * PIXELSIZE,
      Math.floor(Math.random() * magicH) * PIXELSIZE,
    ];
  }
  move(key) {
    ctx.fillStyle = "blue";
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
const canvas = $("#player1");
const ctx = canvas.get(0).getContext("2d");
const canvasWidth = canvas.width();
const canvasHeight = canvas.height();
const DIMENSION = 25;
const PIXELSIZE = canvasWidth / DIMENSION;
const widthMax = canvasWidth - PIXELSIZE;
const hightMax = canvasHeight - PIXELSIZE;
const myplayer = new Player("salim");
const player2 = new Otherplayer();
const postionX = {
  old: myplayer.myStartPoint[0],
  new: myplayer.myStartPoint[0],
};
const postionY = {
  old: myplayer.myStartPoint[1],
  new: myplayer.myStartPoint[1],
};
ctx.fillStyle = "blue";
ctx.fillRect(postionX.old, postionY.old, PIXELSIZE, PIXELSIZE);

// key setup
const a = 97;
const s = 115;
const w = 119;
const d = 100;
