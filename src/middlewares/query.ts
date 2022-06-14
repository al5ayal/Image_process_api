import { Response, Request, NextFunction } from "express";
import sharp from "sharp";
import { ImageProcess } from "../utilities/ImageProcess";
import { ImageProcessInterface } from "../types/ImageProcessInterface";
import { QueryImage } from "../types/QueryImage";
import { ImageWrap } from "./../controllers/ImageFile";

export const queryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // exclude other paths from middleware
  if (req.path !== "/images") return next();
  const queryImage: QueryImage = req.query;
  let image: ImageWrap;
  if (queryImage.filename !== undefined && queryImage.filename.length) {
    image = new ImageWrap(queryImage.filename);
    //check if file exist or errro
    if (!image.fileExist()) {
      return res.status(404).json({ error: "Image File not found" });
    }
    //check if any of this params ar provided and numeric or error
    const width = queryImage.width !== undefined;
    const height = queryImage.height !== undefined;
    //case one and not the other
    if (width && !height) {
      return res.status(400).json({ error: "Height is missing" });
    }
    if (!width && height) {
      return res.status(400).json({ error: "Width is missing" });
    }
    if (width && height) {
      // test if width is numeric
      if (isNaN(Number(queryImage.width)) || !queryImage.width?.length) {
        return res.status(400).json({ error: "width is not valid number" });
      }

      // test if height is numeric
      if (isNaN(Number(queryImage.height)) || !queryImage.height?.length) {
        return res.status(400).json({ error: "height is not valid number" });
      }

      image.setDimensions(Number(queryImage.width), Number(queryImage.height));
      if (image.thumbExist()) {
        // thumb already exist send it from cache
        return res.status(200).sendFile(image.thumbFilePath);
      } else {

        const imageParams: ImageProcessInterface = {
          originalFilePath: image.filePath,
          targetFilePath: image.thumbFilePath,
          QueryImage: queryImage,
        };

        try {
          const processedImage = await ImageProcess(imageParams);
          res.status(200).sendFile(processedImage);
        } catch (err) {
          res.status(500).json({ error: err });
        }
      }
    } else {
      next();
    }
  } else {
    return res
      .status(400)
      .json({ error: "Bad Request Please provide valid parameters" });
    // return next();
  }
};
