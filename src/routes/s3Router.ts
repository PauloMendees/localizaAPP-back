import { Router } from "express";
import { DeleteController } from "../controllers/s3/deleteController";
import { DownloadController } from "../controllers/s3/downloadController";
import { UploadController } from "../controllers/s3/uploadController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const multer = require('multer')
const multerUpload = multer({ dest: 'uploads/' })

const S3Router = Router();

const upload = new UploadController()
const deleteItem = new DeleteController()
const download = new DownloadController()

S3Router.post('/api/item/uploadPhoto/:id', ensureAuthenticated, multerUpload.single("image"), upload.handle);
S3Router.delete('/api/item/deletePhoto/:id', ensureAuthenticated, deleteItem.handle);
S3Router.get('/api/item/downloadPhoto/:id', ensureAuthenticated, download.handle);

export { S3Router }