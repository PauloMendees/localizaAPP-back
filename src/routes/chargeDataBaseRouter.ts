import { Request, Response, Router } from 'express'
import { chargeController } from '../controllers/chargeDb'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticate'

const chargeDataBaseRouter = Router()

const multer = require('multer')
const multerUpload = multer({ dest: 'uploads/' })

chargeDataBaseRouter.post('/api/upload/charge', ensureAuthenticated, multerUpload.single("excel"), (req: Request, res: Response) => {
    return chargeController.handle(req, res)
})

export { chargeDataBaseRouter }