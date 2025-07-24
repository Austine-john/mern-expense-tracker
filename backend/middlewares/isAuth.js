const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "fail", message: "No or malformed token provided" });
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT secret not configured");

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach full payload if needed

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        status: "fail",
        message: "Token expired, please refresh or login again"
      });
    }

    res.status(401).json({
      status: "fail",
      message: process.env.NODE_ENV === "development" ? error.message : "Invalid token, please authenticate"
    });
  }
};

module.exports = isAuthenticated;

