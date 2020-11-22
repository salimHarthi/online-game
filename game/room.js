const { authenticator } = require("otplib");

const roomLimit = (size, room) => {
  if (size >= 2) {
    return false;
  } else {
    return true;
  }
};
const roomExist = (room) => {
  if (room) {
    return true;
  } else {
    return false;
  }
};
const createRoomToken = (secret) => {
  const token = authenticator.generate(secret);
  console.log(token);
  return token;
};
const validateToken = (token, secret) => {
  const isValid = authenticator.verify({ token, secret });
  console.log(isValid);
  console.log(authenticator.timeUsed());
  console.log(authenticator.timeRemaining());
};

module.exports = { roomLimit, createRoomToken, validateToken, roomExist };
