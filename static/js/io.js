var socket = io();
socket.on("disconnect", (reason) => {
  window.location.href = window.location.href.split(
    window.location.pathname
  )[0];
});
