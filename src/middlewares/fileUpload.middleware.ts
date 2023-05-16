import { FILE_DIR, PHOTO_DIR, THUMBNAIL_DIR } from '@/config';
import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import path from 'path';

const photoDir: string = PHOTO_DIR;
const fileDir: string = FILE_DIR;
const thumbnailDir: string = THUMBNAIL_DIR;

const rootDir = path.dirname(path.dirname(__dirname));

if (!existsSync(photoDir)) {
  mkdirSync(rootDir + '/PHOTO');
}
if (!existsSync(fileDir)) {
  mkdirSync(rootDir + '/ASSESTSFILES');
}
if (!existsSync(thumbnailDir)) {
  mkdirSync(rootDir + '/THUMBNAIL');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'memberPhotos') {
      cb(null, path.join(__dirname, '../../', photoDir));
    }
    if (file.fieldname === 'assetsPhoto') {
      cb(null, path.join(__dirname, '../../', fileDir));
    }
    if (file.fieldname === 'thumbnail') {
      cb(null, path.join(__dirname, '../../', thumbnailDir));
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'memberPhotos') {
      cb(null, file.originalname.split(' ').join('_')); // path.extname to Get the extension from a file path
    }
    if (file.fieldname === 'assetsPhoto') {
      cb(null, file.originalname.split(' ').join('_')); // path.extname to Get the extension from a file path
    }
    if (file.fieldname === 'thumbnail') {
      cb(null, file.originalname.split(' ').join('_'));
    }
  },
});
// .split(' ').join('_') => to replace blank space with underscore
const upload = multer({ storage: storage });
console.log('Upload : ', upload);
export { upload };
