$(document).ready(function () {
  const url = window.location.pathname;
  console.log(url);
  const roomId = url.substring(url.lastIndexOf("/") + 1);
  $("#roomId").text(roomId);

  $("#back").click(function () {
    window.location.href = window.location.href.split(url)[0];
  });
});
