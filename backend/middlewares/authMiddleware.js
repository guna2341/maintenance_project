

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token is not provided" });
      }
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.id;
        req.role = decode.role;
        next();
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      return res.status(401).json({ message: "Token is invalid" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", message: err.message });
  }
};

module.exports = { verifyToken };