import { supabase } from "../config/supabase.js";

// middleware to authenticate requests using Supabase JWT Bearer token
export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Bearer <token>

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access token required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = user; // now every later middleware or route handler can access the authenticated user via req.user
    req.token = token;
    next(); // proceed to the next middleware or route handler
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
