export const authorizeRole = (...requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!requiredRole.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: "Authorization error" });
    }
  };
};
