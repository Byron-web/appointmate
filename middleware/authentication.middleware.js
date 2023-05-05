const config = require("../config/config.json");
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  // Check if authorization header is present in the request
  if (!req.headers.authorization) {
    // Return 401 Unauthorized if header is missing
    return res.status(401).send({ err: "Could not find token" });
  }
  // Extract token from the authorization header
  const token = req.headers.authorization.replace(/bearer /i, "");
  try {
    // Verify the token with the provided secret or default one
    const decoded = jwt.verify(token, process.env.SECRET || config.secret);
    // Store the decoded token data in res.locals object for future use
    res.locals.username = decoded.username;
    res.locals.roles = decoded.roles;
    // Call next middleware function in the chain
    return next();
  } catch (err) {
    // Return 401 Unauthorized if token verification fails
    return res.status(401).send({ err: "Invalid token" });
  }
};

exports.rolePolicy = (roles) => {
  return (req, res, next) => {
    // Get user roles from res.locals object
    var userRoles = res.locals.roles;
    // Check if user roles match the required roles
    if (!roles.some((item) => userRoles.includes(item))) {
      // Return 403 Forbidden if user roles don't match
      return res.status(403).send({ err: "Roles don't match" });
    }
    // Call next middleware function in the chain
    return next();
  };
};
