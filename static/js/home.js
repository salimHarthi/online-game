$("form").submit(function (e) {
  let room = $("#room").val();
  let name = $("#name").val();
  if (room) {
    window.location.href = `http://localhost:3000/game/${room}`;
  } else {
    let random = Math.floor(Math.random() * 1000);
    console.log(random);
    window.location.href = `http://localhost:3000/game/${random}`;
  }
  return false;
});
