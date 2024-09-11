const JWT = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies; 
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      });
    }

    // Verify the token using the secret
    const decode = JWT.verify(token, process.env.SECRET);
    req.id = decode._id;
    next(); 
  } catch (error) {
    console.log(error); 
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = isAuthenticated;
