import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const { authToken } = req.cookies;

  // Check if the token is present
  if (!authToken) {
    return res.status(401).json({ message: "No token provided, unauthorized" });
  }

  // Verify token using async/await
  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" });
    }

    // Store user ID and role from the token payload
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  });
}

export default verifyToken;
