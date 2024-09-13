const jwt = require("jsonwebtoken");
const { COOKIE_NAME } = require("./constants");
require("dotenv").config();

exports.generateToken = (id, email) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

// with Promise
// exports.verifyToken = async (req, res, next) => {
//   const token = req.signedCookies[`${COOKIE_NAME}`];

//   return new Promise((resolve, reject) => {
//     if (!token || token.trim() === "")
//       return res.status(401).json({ message: "Token not recieved" });

//     return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: "Token not valid" });
//       }
//       req.user = decoded;
//       resolve();
//       res.locals.jwtData = decoded;
//       return next();
//     });
//   });
// };

exports.verifyToken = async (req, res, next) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not received" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.locals.jwtData = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token not valid" });
  }
};