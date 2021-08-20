import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/)) return callback(null, false);
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name: Array<string> = file.originalname.split('.')[0];
  const fileExtName: string = extname(file.originalname); // .csv
  const randomName: string = Array(6)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join(''); // hexadecimal
  callback(null, `${randomName}-${name}${fileExtName}`);
};

export const multerOptions = (path) => {
  return {
    limits: { files: 1 },
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: path,
      filename: editFileName,
    }),
  };
};
