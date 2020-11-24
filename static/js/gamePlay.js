$(document).ready(function () {
  // connection setup
  socket.on("connect", () => {
    // either with send()
    socket.emit("room", roomId);
  });

  $(document).on("keydown", function (e) {
    myplayer.setDrawState(e);
    myplayer.move(e);
  });

  $(function () {
    socket.on("move", function (move) {
      player2.move(move);
    });
    socket.on("crash", function () {
      alert("crashed");
    });
  });
});
