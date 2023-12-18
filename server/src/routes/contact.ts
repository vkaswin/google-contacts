import { Router } from "express";
import ContactController from "../controllers/contact";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/all", ContactController.getContacts);
router.get("/:contactId/detail", ContactController.getContactById);

router.post("/create", ContactController.createContact);

router.put("/:contactId/update", ContactController.updateContact);

router.delete("/:contactId/remove", ContactController.removeContact);

export default router;
