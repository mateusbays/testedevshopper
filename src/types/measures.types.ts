import { Measure } from "@prisma/client";
import { MeasureType } from "../enums/measureType.enum";

export interface UploadRequestBody {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}

export type UploadResponse = Pick<
  Measure,
  "measure_uuid" | "measure_value" | "image_url"
>;

export interface ConfirmReadingRequestBody {
  measure_uuid: string;
  confirmed_value: number;
}
export interface ReadingsResponse {
  customer_code: string;
  readings: Measure[];
}
