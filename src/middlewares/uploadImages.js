import multer from "multer";
import { v4 as uuid } from "uuid";
import { appError } from "../utils/appError.js";
export const uploadImages = (parameter) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'Uploads/images/')
        },
        filename: function (req, file, cb) {
            const suffix = uuid() + '-' + file.originalname;
            cb(null, suffix)
        }
    });

    function fileFilter(req, file, cb) {


        if (file.mimetype.startsWith('image')) {

            cb(null, true);
        }
        else {
            cb(new appError('wrong file type', 401), false)
        }
    }

    const upload = multer({ storage, fileFilter });
    return upload.single(parameter);
};
