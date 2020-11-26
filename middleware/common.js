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
const createRoomToken = () => {
  const token = authenticator.generate(process.env.secret);
  return token;
};

module.exports = { roomLimit, createRoomToken, roomExist };
