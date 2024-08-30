import { Router } from "express";
import measureController from "../controllers/measures/measure.controller";

const router = Router();

router.post("/upload", measureController.uploadImage);
router.patch("/confirm", measureController.confirmReading);
router.get("/:customer_code/list", measureController.listConsumersReading);

export default router;
