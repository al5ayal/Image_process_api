import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/images/'));
  },
  filename: function (req, file, cb) {
    const date = new Date();
    cb(null, `${date.getHours()}${date.getMinutes()}${date.getSeconds()}_${file.originalname}`);
  }
});

// export const upload = multer({ dest: path.resolve(__dirname, '../public/images/') });
export const upload = multer({ storage });
