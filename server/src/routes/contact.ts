import { Router } from "express";
import ContactController from "../controllers/contact";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/all", ContactController.getContacts);
router.get("/:contactId/detail", ContactController.getContactById);
router.get("/trash", ContactController.getAllTrash);

router.post("/create", ContactController.createContact);

router.put("/:contactId/update", ContactController.updateContact);
router.put("/:contactId/favourite", ContactController.addFavourite);
router.put("/:contactId/recover", ContactController.recoverContact);

router.delete("/:contactId/remove", ContactController.removeContact);
router.delete("/:contactId/favourite", ContactController.removeFavourite);

export default router;
