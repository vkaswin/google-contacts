import { Router } from "express";
import UserRoutes from "./user";
import ContactRoutes from "./contact";
import LabelRoutes from "./label";
import TrashRoutes from "./trash";

const router = Router();

router.use("/api/user", UserRoutes);
router.use("/api/contact", ContactRoutes);
router.use("/api/label", LabelRoutes);
router.use("/api/trash", TrashRoutes);

export default router;
