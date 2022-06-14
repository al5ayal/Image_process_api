import express, { Request, Response } from 'express';
import { queryMiddleware } from '../middlewares/query';
import { ImageWrap } from '../controllers/ImageFile';
import { upload } from '../middlewares/imageUpload';

const apiImagesRoutes = express.Router();

apiImagesRoutes.use(queryMiddleware);

apiImagesRoutes.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Home APi Page' });
});
//upload images

apiImagesRoutes.post('/images/upload', upload.single('image'), (req: Request, res: Response) => {
  res.status(200).json({
    filename: req?.file?.filename,
    filePath: 'http://localhost:3000/api/images?filename=' + req?.file?.filename
  });
});

apiImagesRoutes.get('/images', (req: Request, res: Response) => {
  // Validations and Thumb cache Handled by middleware
  if (req.query.filename !== undefined && req.query.filename.length) {
    const image: ImageWrap = new ImageWrap(req?.query?.filename.toString());
    res.status(200).sendFile(image.filePath);
  }
});

export default apiImagesRoutes;
