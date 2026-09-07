import rateLimit from "express-rate-limit";

// rate limiter middleware for login endpoint to prevent brute-force attacks.
// limits each IP address to 5 requests per 15-minute window.
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Too many authentication attempts. Please try again later.",
  },
  statusCode: 429,
});
