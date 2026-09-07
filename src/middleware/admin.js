// middleware to check if the authenticated user has admin role privileges.
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const isAdmin =
    req.user.app_metadata?.role === "admin" ||
    req.user.user_metadata?.role === "admin" ||
    req.user.user_metadata?.is_admin === true;

  if (!isAdmin) {
    return res.status(403).json({
      error: "Forbidden: Administrator privileges required",
    });
  }

  next();
};
