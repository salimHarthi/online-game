const url = window.location.pathname;
const roomId = url.substring(url.lastIndexOf("/") + 1);
class Otherplayer {
  move(data) {
    ctx2.clearRect(data.postionX.old, data.postionY.old, PIXELSIZE, PIXELSIZE);
    ctx2.fillRect(data.postionX.new, data.postionY.new, PIXELSIZE, PIXELSIZE);
  }
}
class Player {
  constructor(name) {
    this.myStartPoint = this.startPoint();
    this.name = name;
    this.draw = true;
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
    if (key.charCode == k) {
      this.draw = !this.draw;
      ctx.fillStyle = this.draw ? "DodgerBlue" : "red";
    }
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

    if (this.draw) {
      ctx.fillRect(postionX.new, postionY.new, PIXELSIZE, PIXELSIZE);
    } else {
      ctx.clearRect(postionX.old, postionY.old, PIXELSIZE, PIXELSIZE);
      ctx.fillRect(postionX.new, postionY.new, PIXELSIZE, PIXELSIZE);
    }
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

// key setup
const w = 119; //up
const s = 115; // down
const a = 97; // lef
const d = 100; //right
const k = 107; // drow / stop
