import express from "express";
import corsMiddleware from "./middleware/corsMiddleware"; // Import middleware CORS
import authRoutes from "./routes/authRoutes";

import { config } from "./config";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.json());
app.use(corsMiddleware);
app.use("/auth", authRoutes);
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
