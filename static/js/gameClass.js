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

// key setup
const w = 87; //up
const s = 83; // down
const a = 65; // lef
const d = 68; //right
const enter = 13; //submit
const up = 38;
const down = 40;
const left = 37;
const right = 39;
const space = 32; // drow / stop

// setup image
const canvasCopy = $("#copy");
const ctxCopy = canvasCopy.get(0).getContext("2d");

for (const [key, value] of Object.entries(staticCavas1)) {
  ctxCopy.fillStyle = value;

  let [x, y] = key.split(",");
  ctxCopy.fillRect(x, y, PIXELSIZE, PIXELSIZE);
}

const won = (data) => {
  alert(`${data.name} has won`);
};
