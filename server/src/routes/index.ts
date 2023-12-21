import { Router } from "express";
import UserRoutes from "./user";
import ContactRoutes from "./contact";
import LabelRoutes from "./label";

const router = Router();

router.use("/api/user", UserRoutes);
router.use("/api/contact", ContactRoutes);
router.use("/api/label", LabelRoutes);

router.get("/api/health-check", (req, res) => {
  res.status(200).send({
    status: "Success",
    data: {
      message: "Service is running smoothly",
      version: "1.0.0",
    },
  });
});

export default router;
