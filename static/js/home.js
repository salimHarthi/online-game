$("form").on("submit", function (e) {
  e.preventDefault();

  let room = $("#room").val();
  let name = $("#name").val();
  sessionStorage.setItem("name", name);

  // check if room is available
  if (!name) {
    alert("Name is required");
    return false;
  }
  if (room && name) {
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
  let name = $("#name").val();
  if (name) {
    $.get(`${window.location.href}otp`, function (data, textStatus, jqXHR) {
      sessionStorage.setItem("name", name);
      let random = Math.floor(Math.random() * 1000);
      window.location.href = `${window.location.href}game/${data}/${random}`;
    });
  } else alert("Name is required");
});

socket.on("RoomAvailable", (myroom) => {
  $.get(`${window.location.href}otp`, function (data, textStatus, jqXHR) {
    window.location.href = `${window.location.href}game/${data}/${myroom}`;
  });
});
