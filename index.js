import express from "express";
import dotenv from "dotenv";
import menuRoutes from "./routes/MenuRoutes.js";
import { sequelize, testConnection } from "./config/db.js";
import { askGemini } from "./controller/GeminiController.js";

dotenv.config();

const app = express();
app.use(express.json());
await testConnection();
await sequelize.sync({ alter: true });

// Menu endpoints
app.use("/menu", menuRoutes);
app.use("/menu/gemini", askGemini, menuRoutes);

const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
export default app;
