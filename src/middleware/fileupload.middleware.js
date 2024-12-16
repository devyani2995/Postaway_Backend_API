import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        //const name = Date.now() + '-' + file.originalname;
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage: storageConfig,
});