const { authenticator } = require("otplib");

const validOtp = async (req, res, next) => {
  const otp = req.params.otp;
  const secret = process.env.secret;
  const isValid = authenticator.verify({ token: otp, secret: secret });
  if (isValid) next();
  else res.status(301).send("invalid otp code");
};

module.exports = { validOtp };
