import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { extractMimeTypeAndCleanBase64 } from "../utils/extractMimeTypeAndCleanBase64";
import { CustomError } from "../errors/customErrors";

dotenv.config();

class GeminiImageAnalyzer {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não está definida");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async analyzeImage(base64Image: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
      });

      const { mimeType, cleanedBase64 } =
        extractMimeTypeAndCleanBase64(base64Image);

      const imagePart = {
        inlineData: {
          data: cleanedBase64,
          mimeType: mimeType,
        },
      };

      const prompt =
        "Please read and return the numeric value displayed on this meter and return only the value.";

      const result = await model.generateContent([prompt, imagePart]);

      const response = result.response;
      const text = response.text();

      return text;
    } catch (err) {
      console.log(err);
      throw new CustomError(
        "GEMINI_INTERNAL_SERVER_ERROR",
        "Erro ao realizar leitura na api do Gemini, tente novamente !!"
      );
    }
  }
}

export default GeminiImageAnalyzer;
