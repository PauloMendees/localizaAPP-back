import { Request, response, Response } from 'express'
import { Responses } from '../../lib/response'
import { Upload } from '../../useCases/s3/lib/upload'

export class UploadController {
    async handle(req: Request, res: Response) {
        const responses = new Responses()
        try {
            const file = req.file
            const { id } = req.params

            const upload = new Upload()

            if(!file) return responses.ParamsError(res, "Arquivo vazio ou não identificado.")
            const uploadData = await upload.execute(file, id);

            if (uploadData.error) return responses.ParamsError(res, uploadData.message);
            return responses.res200(res, uploadData, "Upload concluído com sucesso.") 
        } catch (e) {
            return responses.InternalError(res);
        }
    }
}