import { Router } from "express";
import ContactController from "../controllers/contact";
import verifyToken from "../middlewares/verifyToken";
import fileHandler from "../middlewares/fileHandler";

const router = Router();

router.use(verifyToken);

router.get("/all", ContactController.getContacts);
router.get("/:contactId/detail", ContactController.getContactById);
router.get("/trash", ContactController.getAllTrash);
router.get("/sample", ContactController.downloadSampleFile);
router.get("/export", ContactController.exportContact);
router.get("/count", ContactController.getContactCount);

router.post("/create", ContactController.createContact);
router.post(
  "/upload",
  fileHandler.single("file"),
  ContactController.bulkUpload
);

router.put("/:contactId/update", ContactController.updateContact);
router.put("/:contactId/favourite", ContactController.addFavourite);
router.put("/:contactId/recover", ContactController.recoverContact);
router.put("/:contactId/label", ContactController.updateContactLabel);

router.delete("/remove", ContactController.removeContact);
router.delete("/:contactId/favourite", ContactController.removeFavourite);
router.delete("/trash", ContactController.clearTrash);

export default router;
