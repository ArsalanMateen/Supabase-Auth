import express from "express";
import dotenv from "dotenv";
import fs from "fs"; // module for file system operations to read the swagger.json file
import path from "path"; // module for handling file and directory paths
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";

import authRouter from "./routes/auth.js";
import publicRouter from "./routes/public.js";
import protectedRouter from "./routes/protected.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // return the directory portion of the file path
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../swagger.json"), "utf8"),
);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // middleware to parse incoming JSON requests

// swagger documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use("/auth", authRouter);
app.use("/public", publicRouter);
app.use("/protected", protectedRouter);

// health check route
app.get("/", (req, res) => {
  res.json({ status: "healthy", message: "Authentication API is active" });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and connected to Supabase`);
});

export { app, server };
