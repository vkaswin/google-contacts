import { Router } from "express";
import ContactController from "../controllers/contact";

const router = Router();

router.get("/all", ContactController.getAllContacts);

export default router;
