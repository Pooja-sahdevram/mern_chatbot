const jwt = require("jsonwebtoken");
const { COOKIE_NAME } = require("./constants");

const createToken = (id, email, expiresIn) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

const verifyToken = async (req, res, next
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
    if (err) {
      return res.status(401).json({ message: "Token Expired" });
    } else {
      res.locals.jwtData = success;
      return next();
    }
  });
};

module.exports = {createToken, verifyToken}