import {
  ConfirmReadingRequestBody,
  UploadRequestBody,
} from "../types/measures.types";

const uploadImage = (requestBody: UploadRequestBody): void => {
  console.log(requestBody);
};

const confirmReading = (requestBody: ConfirmReadingRequestBody): void => {};

const listConsumersReading = (): void => {};

export default { uploadImage, confirmReading, listConsumersReading };
