const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    // 1. Extract token
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    // 2. Verify token synchronously (better for middleware)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    // 3. Attach user to request
    req.user = decoded.id;
    next();

  } catch (error) {
    // 4. Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        status: "fail",
        message: "Token expired, please refresh or login again" 
      });
    }

    // 5. Other JWT errors (malformed, invalid, etc.)
    res.status(401).json({
      status: "fail",
      message: "Invalid token, please authenticate"
    });
  }
};

module.exports = isAuthenticated;
