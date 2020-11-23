$(document).ready(function () {
  const url = window.location.pathname;
  const roomId = url.substring(url.lastIndexOf("/") + 1);
  $("#roomId").text(roomId);

  $("#back").click(function () {
    window.location.href = window.location.href.split(url)[0];
  });

  //   var image = new Image();
  //   image.src = canvas.get(0).toDataURL();
  //   const coppy = $("#testcanves").get(0).getContext("2d");
  //   image.onload = function () {
  //     coppy.drawImage(image, 0, 0);
  //   };
});
