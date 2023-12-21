import { Router } from "express";
import LabelController from "../controllers/label";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/all", LabelController.getAllLabels);

router.post("/create", LabelController.createLabel);

router.put("/:labelId/update", LabelController.updateLabel);

router.delete("/:labelId/remove", LabelController.removeLabel);

export default router;
