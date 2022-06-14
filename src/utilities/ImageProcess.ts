import sharp from "sharp";
import { ImageProcessInterface } from "../types/ImageProcessInterface";

export async function ImageProcess(
  ImageParams: ImageProcessInterface
): Promise<string> {
  try {
    const processedImage = await sharp(ImageParams.originalFilePath)
      .resize(
        Number(ImageParams.QueryImage.width),
        Number(ImageParams.QueryImage.height)
      )
      .toFile(ImageParams.targetFilePath);
    return ImageParams.targetFilePath;
  } catch (error) {
    return "Failed to resize the image";
  }
}
