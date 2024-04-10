const jwt = require("jsonwebtoken"); // Import the JSON Web Token library.
const secretKey = "secretKey"; // Define a secret key for token encryption/decryption.

// Middleware to authenticate the token in the request.
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (authHeader) {
    // Verify the token using the secret key
    jwt.verify(authHeader, "secretKey", (err, user) => {
      console.log(user);
      if (err) {
        return res.sendStatus(403); // If token verification fails, send a 403 Forbidden status.
      }
      req.user = user; // If verified, attach the user payload to the request object.
      next(); // Proceed to the next middleware or request handler.
    });
  } else {
    res.sendStatus(401); // If no token is provided, send a 401 Unauthorized status.
  }
};

// Middleware to check if the authenticated user is an admin.
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization; // Extract the token from the authorization header.

  if (!token) {
    return res.status(401).json({ message: "No token provided." });  // Send a 401 status if no token is found.
  }

  try {
    const decodedToken = jwt.verify(token, secretKey); // Decode the token.

    if (decodedToken.user_type === "admin") {
      // If the user is an admin, proceed to the next middleware or route handler.
      next();
    } else {
      // If the user is not an admin, return a 403 Forbidden error.
      return res.status(403).json({ message: "You do not have admin access." });
    }
  } catch (err) {
    // If token is invalid, send a 401 Unauthorized status.
    return res.status(401).json({ message: "Invalid token." });
  }
};


// Function to get the user ID from the token.
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, "secretKey"); // Decode the token.
    
    return decoded.userId;  // Return the user ID from the decoded token.
  } catch (err) {
    return null; // If decoding fails, return null.
  }
};

module.exports = { authenticateToken, getUserIdFromToken, isAdmin };
