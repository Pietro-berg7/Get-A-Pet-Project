import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Destination to store the images
const imageStorage = multer.diskStorage({
  destination: function (req, _file, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    cb(null, `public/images/${folder}`);
  },
  filename: function (_req, file, cb) {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  fileFilter(_req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas jpg ou png!"));
    }
    cb(null, true);
  },
});
