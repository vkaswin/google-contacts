import { Router } from "express";
import LabelController from "../controllers/label";

const router = Router();

router.get("/all", LabelController.getAllLabels);

router.post("/create", LabelController.createLabel);

router.put("/:labelId/update", LabelController.updateLabel);

router.delete("/:labelId/remove", LabelController.removeLabel);

export default router;
