import { Request, Response } from "express";
import { confirmReadingSchema, uploadImageSchema } from "./schema";
import {
  ConfirmReadingRequestBody,
  UploadRequestBody,
} from "../../types/measures.types";
import consumptionService from "../../services/measures.service";

const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = uploadImageSchema.validate(req.body);

    if (error) {
      // return res.status(400).json({ error: error.details[0].message });
    }

    const requestBody: UploadRequestBody = req.body;

    const result = consumptionService.uploadImage(requestBody);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const confirmReading = (req: Request, res: Response): void => {
  try {
    const { error } = confirmReadingSchema.validate(req.body);

    if (error) {
      //return res.status(400).json({ error: error.details[0].message });
    }

    const requestBody: ConfirmReadingRequestBody = req.body;

    const result = consumptionService.confirmReading(requestBody);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const listConsumersReading = (req: Request, res: Response): void => {
  const customerCode = req.params.customerCode;
  // Lógica para listar leituras de consumidores
  res.status(200).json({ success: true, customerCode });
};

export default {
  uploadImage,
  confirmReading,
  listConsumersReading,
};
