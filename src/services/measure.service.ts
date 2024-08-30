import { PrismaClient, Measure } from "@prisma/client";
import {
  ConfirmReadingRequestBody,
  ReadingsResponse,
  UploadRequestBody,
  UploadResponse,
} from "../types/measures.types";
import GeminiImageAnalyzer from "../api/gemini";
import { CustomError } from "../errors/customErrors";

export class MeasureService {
  private prisma = new PrismaClient();

  async uploadImage(requestBody: UploadRequestBody): Promise<UploadResponse> {
    const { measure_type, measure_datetime, customer_code, image } =
      requestBody;

    const readingExists = await this.hasReadingForMonth(requestBody);

    if (readingExists) {
      throw new CustomError("DOUBLE_REPORT", "Leitura do mês já realizada");
    }

    const analyzer = new GeminiImageAnalyzer();

    const measureValue = await analyzer.analyzeImage(image);

    const newMeasure: Omit<
      Measure,
      "measure_uuid" | "has_confirmed" | "createdAt" | "updatedAt"
    > = {
      customer_code,
      measure_type: measure_type.toUpperCase(),
      measure_value: Number(measureValue),
      measure_datetime: new Date(measure_datetime),
      image_url: image,
    };

    const savedMeasure = await this.prisma.measure.create({
      data: newMeasure,
    });

    return {
      measure_uuid: savedMeasure.measure_uuid,
      measure_value: savedMeasure.measure_value,
      image_url: savedMeasure.image_url,
    };
  }

  async confirmReading(
    requestBody: ConfirmReadingRequestBody
  ): Promise<{ success: string }> {
    const { measure_uuid, confirmed_value } = requestBody;

    const measure = await this.prisma.measure.findUnique({
      where: { measure_uuid },
    });

    if (!measure) {
      throw new CustomError("MEASURE_NOT_FOUND", "Leitura não encontrada");
    }

    if (measure.has_confirmed) {
      throw new CustomError(
        "CONFIRMATION_DUPLICATE",
        "Leitura do mês já confirmada"
      );
    }

    await this.prisma.measure.update({
      where: { measure_uuid },
      data: { measure_value: confirmed_value, has_confirmed: true },
    });

    return { success: "true" };
  }

  async listConsumersReading(
    customer_code: string,
    measure_type?: string
  ): Promise<ReadingsResponse> {
    const readings = await this.prisma.measure.findMany({
      where: {
        customer_code,
        measure_type: measure_type ? measure_type.toUpperCase() : {},
      },
    });

    return { customer_code, readings };
  }

  private async hasReadingForMonth(
    requestBody: UploadRequestBody
  ): Promise<boolean> {
    const { measure_type, customer_code } = requestBody;

    const date = new Date(requestBody.measure_datetime);
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const count = await this.prisma.measure.count({
      where: {
        measure_type,
        customer_code,
        measure_datetime: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return count > 0;
  }
}
