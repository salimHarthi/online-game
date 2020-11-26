const { createRoomToken } = require("../../middleware/common");

const generatRoomToken = async (req, res) => {
  try {
    res.send(createRoomToken());
  } catch (e) {
    console.log(e);
  }
};
module.exports = { generatRoomToken };
