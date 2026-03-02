import { Router } from "express";
import authRoutes from "./modules/auth/authRoutes.js";
import projectRoutes from "./modules/projects/projectRoutes.js";
import taskRoutes from "./modules/tasks/taskRoutes.js";
import uploadRoutes from "./modules/uploads/uploadRoutes.js";
import riskRoutes from "./modules/risk/riskRoutes.js";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/projects", projectRoutes);
routes.use("/task", taskRoutes);
routes.use("/upload", uploadRoutes);
routes.use("/risk", riskRoutes);           

export default routes;
