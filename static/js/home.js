$("form").on("submit", function (e) {
  e.preventDefault();

  let room = $("#room").val();
  let name = $("#name").val();
  sessionStorage.setItem("name", name);

  // check if room is available
  if (room) {
    socket.emit("checkRoom", room);
    socket.on("checkRoom", (room) => {
      alert(room); //room is not available
      window.location.href = window.location.href;
    });
  } else {
    alert("Add room Id");
  }
  return false;
});
$("#create").click(function () {
  let random = Math.floor(Math.random() * 1000);
  window.location.href = `${window.location.href}game/${random}`;
});

socket.on("RoomAvailable", (data) => {
  window.location.href = `${window.location.href}game/${room}`;
});
