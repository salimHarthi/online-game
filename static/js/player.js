const url = window.location.pathname;
const roomId = url.substring(url.lastIndexOf("/") + 1);
class Otherplayer {
  constructor(name) {
    this.ratioScale = 2;
  }
  move(data) {
    if (data.draw) {
      ctx2.fillRect(
        data.postionX.new / this.ratioScale,
        data.postionY.new / this.ratioScale,
        PIXELSIZE / this.ratioScale,
        PIXELSIZE / this.ratioScale
      );
    } else {
      ctx2.clearRect(
        data.postionX.old / this.ratioScale,
        data.postionY.old / this.ratioScale,
        PIXELSIZE / this.ratioScale,
        PIXELSIZE / this.ratioScale
      );
      ctx2.fillRect(
        data.postionX.new / this.ratioScale,
        data.postionY.new / this.ratioScale,
        PIXELSIZE / this.ratioScale,
        PIXELSIZE / this.ratioScale
      );
    }
  }
}
class Player {
  constructor(name) {
    this.myStartPoint = this.startPoint();
    this.name = name;
    this.draw = true;
    this.board = {};
  }

  startPoint() {
    let magicW = widthMax / PIXELSIZE;
    let magicH = hightMax / PIXELSIZE;
    return [
      Math.floor(Math.random() * magicW) * PIXELSIZE,
      Math.floor(Math.random() * magicH) * PIXELSIZE,
    ];
  }
  setDrawState(key) {
    if (key.which == k) {
      this.draw = !this.draw;
      ctx.fillStyle = this.draw ? "DodgerBlue" : "red";
    }
  }
  trakPaint(x, y) {
    this.board[`${x},${y}`] = ctx.fillStyle;
  }
  move(key) {
    postionX.old = postionX.new;
    postionY.old = postionY.new;
    switch (key.which) {
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
      case left:
        postionX.new -= PIXELSIZE;
        break;
      case down:
        postionY.new += PIXELSIZE;
        break;
      case up:
        postionY.new -= PIXELSIZE;
        break;
      case right:
        postionX.new += PIXELSIZE;
        break;
      default:
    }
    postionX.new = postionX.new < 0 ? 0 : postionX.new;
    postionY.new = postionY.new < 0 ? 0 : postionY.new;
    postionX.new = postionX.new > widthMax ? widthMax : postionX.new;
    postionY.new = postionY.new > hightMax ? hightMax : postionY.new;

    if (this.draw) {
      ctx.fillRect(postionX.new, postionY.new, PIXELSIZE, PIXELSIZE);
      this.trakPaint(postionX.new, postionY.new);
    } else {
      ctx.clearRect(postionX.old, postionY.old, PIXELSIZE, PIXELSIZE);
      ctx.fillRect(postionX.new, postionY.new, PIXELSIZE, PIXELSIZE);
    }
    socket.emit("move", {
      postionX: postionX,
      postionY: postionY,
      name: this.name,
      id: roomId,
      draw: this.draw,
    });
  }
}

// setup
const canvas = $("#player1");
const canvas2 = $("#player2");
const ctx = canvas.get(0).getContext("2d");
const ctx2 = canvas2.get(0).getContext("2d");
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
ctx.fillStyle = "DodgerBlue";
ctx2.fillStyle = "red";
ctx.fillRect(postionX.old, postionY.old, PIXELSIZE, PIXELSIZE);
myplayer.trakPaint(postionX.old, postionY.old);
// key setup
const w = 87; //up
const s = 83; // down
const a = 65; // lef
const d = 68; //right
const k = 75; // drow / stop
const up = 38;
const down = 40;
const left = 37;
const right = 39;
