const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unautorized." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unautorized." });
    }

    req.userId = decoded._id;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = isAuthenticated;