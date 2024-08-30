import { Response } from "express";
import { CustomError } from "../errors/customErrors";

export const handleError = (err: any, res: Response): void => {
  if (err instanceof CustomError) {
    const statusCode = getStatusCode(err.error_code);
    res.status(statusCode).json(err);
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
};

const getStatusCode = (errorCode: string): number => {
  switch (errorCode) {
    case "INVALID_DATA":
      return 400;
    case "DOUBLE_REPORT":
    case "CONFIRMATION_DUPLICATE":
      return 409;
    case "MEASURE_NOT_FOUND":
    case "MEASURES_NOT_FOUND":
      return 404;
    case "GEMINI_INTERNAL_SERVER_ERROR":
      return 500;
    default:
      return 500;
  }
};
