const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const path = require("path");

const multerObjectMaker = (subFolder, mimeTypes, maxSize, errorMessage) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `${__dirname}/../public/uploads/images/${subFolder}`;
      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);

      const fileName = uuidv4() + "-" + Date.now() + fileExt;

      cb(null, fileName);
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
      if (mimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(500, errorMessage));
      }
    },
  });

  return upload;
};

module.exports = multerObjectMaker;
