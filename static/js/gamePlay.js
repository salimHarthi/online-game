$(document).ready(function () {
  // connection setup
  socket.on("connect", () => {
    // either with send()
    socket.emit("room", roomId);
  });

  $(document).on("keypress", function (e) {
    myplayer.move(e);
  });

  $(function () {
    socket.on("move", function (move) {
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
