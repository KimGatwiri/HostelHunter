import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ message: "No token provided, unauthorized" });
  }

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" });
    }

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  });
}

export default verifyToken;
