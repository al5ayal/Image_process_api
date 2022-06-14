import express, { Request, Response } from 'express';
const indexRoutes = express.Router();

indexRoutes.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Image Processing Api', txt: req.query.txt });
});
export default indexRoutes;
