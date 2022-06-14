import express, { Application } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import path from 'path';
import indexRoutes from './routes/indexRoutes';
import apiImagesRoutes from './routes/apiImagesRoutes';

dotenv.config();

// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));

app.use('/public', express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/api', apiImagesRoutes);
app.get('*', function (req, res) {
  res.status(404).send('Sorry Page Is not Found');
});
const PORT = process.env.SERVERPORT || 3000;
// start express server
app.listen(PORT, () => {
  /* eslint-disable */
  console.log(`Server is starting at port: http://localhost:${PORT}`);
});

export default app;
