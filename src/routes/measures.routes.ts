import { Router } from "express";
import measuresController from "../controllers/measures/measures.controller";

const router = Router();

router.post("/upload", measuresController.uploadImage);
router.patch("/confirm", measuresController.confirmReading);
router.get("/:customer_code/list", measuresController.listConsumersReading);

export default router;
