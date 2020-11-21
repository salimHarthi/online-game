
$( document ).ready(function() {
  const socket = io('http://localhost:3000/');

  $(function () {
      socket.on('chat message', function(msg){
        $('#test').text(msg);
      });

  });
// setup 
  let canvas = $("#myCanvas");
  let ctx = canvas.get(0).getContext("2d");
  let canvasWidth = canvas.width();
  let canvasHeight = canvas.height();
  let DIMENSION = 25
  let PIXELSIZE = canvasWidth / DIMENSION;
  let selectedColor = '#222244';
  let enabled = true;
  let filledPixels = {};
  let postionX = {old:0, new:0}
  let postionY = {old:0, new:0}
  let widthMax= canvasWidth-PIXELSIZE
  let hightMax= canvasHeight-PIXELSIZE
  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  for (let i = 0; i < DIMENSION; ++i) {
    x = Math.floor(i * canvasWidth / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();

    y = Math.floor(i * canvasHeight / DIMENSION);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }
  ctx.fillRect(postionX.old, postionY.old, PIXELSIZE, PIXELSIZE);

// key setup 
const a = 97
const s= 115
const w= 119
const d = 100
  const move= (key)=>{
    postionX.old = postionX.new
    postionY.old = postionY.new
    switch(key.charCode) {
      case a:
        postionX.new-=PIXELSIZE
        break;
      case s:
        postionY.new+=PIXELSIZE
        break;
      case w:
        postionY.new-=PIXELSIZE
          break;
      case d:
        postionX.new+=PIXELSIZE
            break;
      default:
        
    }
    postionX.new = postionX.new<0?0:postionX.new
    postionY.new = postionY.new<0?0:postionY.new
    postionX.new = postionX.new>widthMax?widthMax:postionX.new
    postionY.new = postionY.new>hightMax?hightMax:postionY.new
    
    console.log(postionX.new,postionY.new)
    ctx.clearRect(postionX.old, postionY.old, PIXELSIZE, PIXELSIZE);
    ctx.fillRect(postionX.new, postionY.new, PIXELSIZE, PIXELSIZE);
  }
  $(document).on('keypress',function(e) {
    //console.log(e)
    move(e)
    if(e.which == 13) {
        alert('You pressed enter!');
    }
  });
});

