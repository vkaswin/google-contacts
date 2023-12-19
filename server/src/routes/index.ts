import { Router } from "express";
import UserRoutes from "./user";
import ContactRoutes from "./contact";
import LabelRoutes from "./label";

const router = Router();

router.use("/api/user", UserRoutes);
router.use("/api/contact", ContactRoutes);
router.use("/api/label", LabelRoutes);

export default router;
