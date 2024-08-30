import { Request, Response } from "express";
import { CustomError } from "../../errors/customErrors";
import { MeasureService } from "../../services/measure.service";
import {
  ConfirmReadingRequestBody,
  UploadRequestBody,
} from "../../types/measures.types";
import {
  confirmReadingSchema,
  listConsumersReadingSchema,
  uploadImageSchema,
} from "./schema";
import Joi from "joi";
import { handleError } from "../../errors/handleError";

class MeasureController {
  private measureService: MeasureService;

  constructor(measureService: MeasureService = new MeasureService()) {
    this.measureService = measureService;
  }

  public uploadImage = async (req: Request, res: Response): Promise<void> => {
    try {
      this.validateSchema(uploadImageSchema, req.body);

      const result = await this.measureService.uploadImage(
        req.body as UploadRequestBody
      );

      res.status(200).json(result);
    } catch (err) {
      handleError(err, res);
    }
  };

  public confirmReading = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      this.validateSchema(confirmReadingSchema, req.body);

      const result = await this.measureService.confirmReading(
        req.body as ConfirmReadingRequestBody
      );

      res.status(200).json(result);
    } catch (err) {
      handleError(err, res);
    }
  };

  public listConsumersReading = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { customer_code, measure_type } = req.params;

      this.validateSchema(listConsumersReadingSchema, req.body);

      const result = await this.measureService.listConsumersReading(
        customer_code,
        measure_type
      );

      if (result.readings.length === 0) {
        throw new CustomError(
          "MEASURES_NOT_FOUND",
          "Nenhuma leitura encontrada"
        );
      }

      res.status(200).json(result);
    } catch (err) {
      handleError(err, res);
    }
  };

  private validateSchema(schema: Joi.ObjectSchema<any>, data: any): void {
    const { error } = schema.validate(data);
    if (error) {
      throw new CustomError("INVALID_DATA", error.message);
    }
  }
}

export default new MeasureController();
