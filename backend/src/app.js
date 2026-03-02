// src/app.js
import express from "express";
import cors from "cors";
import routes from "./routes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import mockAIRoutes from "./modules/mockAI/mockAIRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Application is healthy");
});
app.use("/api", routes);
app.use("/mock-ai", mockAIRoutes);

// Error middleware – always last
app.use(errorMiddleware);

export default app;
