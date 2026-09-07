import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = Router();

// protect all routes within this router
router.use(authenticateUser);

// GET /protected/profile
router.get("/profile", (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    created_at: req.user.created_at,
  });
});

// GET /protected/dashboard
router.get("/dashboard", (req, res) => {
  return res.status(200).json({
    message: "Welcome to your private dashboard",
    user_id: req.user.id,
    email: req.user.email,
    stats: {
      account_status: "active",
      last_sign_in: req.user.last_sign_in_at || req.user.created_at,
    },
  });
});

// GET /protected/admin
router.get("/admin", requireAdmin, (req, res) => {
  return res.status(200).json({
    message: "Welcome to the administrator area",
    admin_user: req.user.email,
  });
});

export default router;
