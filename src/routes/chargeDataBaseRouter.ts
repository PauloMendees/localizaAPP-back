import { Router } from 'express'
import { ChargeController } from '../controllers/chargeController/chargeController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate'

const chargeDataBaseRouter = Router()

const multer = require('multer')
const multerUpload = multer({ dest: 'uploads/' })

const chargeController = new ChargeController()

chargeDataBaseRouter.post('/api/upload/charge', ensureAuthenticated, multerUpload.single("excel"), chargeController.handle)

export { chargeDataBaseRouter }