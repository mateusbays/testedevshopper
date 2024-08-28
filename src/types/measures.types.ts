import { MeasureType } from "../enums/measureType.enum";

export interface UploadRequestBody {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
}

export interface ConfirmReadingRequestBody {
  measure_uuid: string;
  confirmed_value: number;
}
