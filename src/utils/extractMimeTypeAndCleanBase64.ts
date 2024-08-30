/**
 * Remove o prefixo da string base64 e retorna o MIME type.
 *
 * @param base64Image A string base64 com o prefixo.
 * @returns Um objeto contendo o MIME type e a string base64 limpa.
 */
export const extractMimeTypeAndCleanBase64 = (
  base64Image: string
): {
  mimeType: string;
  cleanedBase64: string;
} => {
  const base64Pattern = /^data:(image\/[a-zA-Z]+);base64,(.*)$/;

  const match = RegExp(base64Pattern).exec(base64Image);

  if (!match) {
    throw new Error("Base64 inválido ou prefixo não reconhecido.");
  }

  const mimeType = match[1];
  const cleanedBase64 = match[2];

  return { mimeType, cleanedBase64 };
};
