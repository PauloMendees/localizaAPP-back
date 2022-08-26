import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { Download } from '../../useCases/s3/lib/download'

export class DownloadController {
    async handle(req: Request, res: Response) {
        const responses = new Responses()
        const { id } = req.params
        try {
            res.attachment(id)
            const download = new Download()
            const response = await download.execute(id)
            if(!response.error) {
                response.data.pipe(res)
            } else {
                return responses.ParamsError(res, response.message)
            }
        } catch (error) {
            return responses.InternalError(res, error)
        }
    }
}