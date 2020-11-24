if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  window.location.href = window.location.href.split(url)[0];
}
$(document).ready(function () {
  const url = window.location.pathname;
  const roomId = url.substring(url.lastIndexOf("/") + 1);
  $("#roomId").text(roomId);

  $("#back").click(function () {
    window.location.href = window.location.href.split(url)[0];
  });
});
