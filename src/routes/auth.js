import { Router } from "express";

import { supabase } from "../config/supabase.js";

const router = Router();

function validateCredentials(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return null;
  }

  return { email, password };
}

// POST /auth/signup
router.post("/signup", async (req, res) => {
  try {
    const credentials = validateCredentials(req, res);
    if (!credentials) return;
    const { email, password } = credentials;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user: data.user,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const credentials = validateCredentials(req, res);
    if (!credentials) return;
    const { email, password } = credentials;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // contains session (tokens and user info) if successful

    if (error) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    return res.status(200).json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      token_type: "bearer",
      expires_in: data.session.expires_in,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
