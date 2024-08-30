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

class MeasureController {
  private measureService: MeasureService;

  constructor() {
    this.measureService = new MeasureService();
  }

  public uploadImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = uploadImageSchema.validate(req.body);

      if (error) {
        throw new CustomError("INVALID_DATA", error.message);
      }

      const requestBody: UploadRequestBody = req.body;

      const result = await this.measureService.uploadImage(requestBody);

      res.status(200).json(result);
    } catch (err) {
      if (err instanceof CustomError) {
        if (err.error_code === "INVALID_DATA") {
          res.status(400).json(err);
        } else if (err.error_code === "DOUBLE_REPORT") {
          res.status(409).json(err);
        } else if (err.error_code === "GEMINI_INTERNAL_SERVER_ERROR") {
          res.status(500).json(err);
        }
      } else {
        res
          .status(500)
          .json(
            new CustomError(
              "INTERNAL_SERVER_ERROR",
              "An unexpected error occurred."
            )
          );
      }
    }
  };

  public confirmReading = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { error } = confirmReadingSchema.validate(req.body);

      if (error) {
        throw new CustomError("INVALID_DATA", error.message);
      }

      const requestBody: ConfirmReadingRequestBody = req.body;

      const result = await this.measureService.confirmReading(requestBody);

      res.status(200).json(result);
    } catch (err) {
      if (err instanceof CustomError) {
        if (err.error_code === "INVALID_DATA") {
          res.status(400).json(err);
        } else if (err.error_code === "MEASURE_NOT_FOUND") {
          res.status(404).json(err);
        } else if (err.error_code === "CONFIRMATION_DUPLICATE") {
          res.status(409).json(err);
        }
      } else {
        res
          .status(500)
          .json(
            new CustomError(
              "INTERNAL_SERVER_ERROR",
              "An unexpected error occurred."
            )
          );
      }
    }
  };

  public listConsumersReading = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { customer_code, measure_type } = req.params;

      const { error } = listConsumersReadingSchema.validate(req.body);

      if (error) {
        throw new CustomError("INVALID_DATA", error.message);
      }

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
      if (err instanceof CustomError) {
        if (err.error_code === "INVALID_DATA") {
          res.status(400).json(err);
        } else if (err.error_code === "MEASURES_NOT_FOUND") {
          res.status(404).json(err);
        }
      } else {
        res
          .status(500)
          .json(
            new CustomError(
              "INTERNAL_SERVER_ERROR",
              "An unexpected error occurred."
            )
          );
      }
    }
  };
}

export default new MeasureController();
