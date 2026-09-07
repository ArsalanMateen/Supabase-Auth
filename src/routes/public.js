import { Router } from "express";

const router = Router();

// GET /public/info
router.get("/info", (req, res) => {
  res.status(200).json({
    message:
      "Welcome! This information is publicly accessible without authentication.",
  });
});

export default router;
