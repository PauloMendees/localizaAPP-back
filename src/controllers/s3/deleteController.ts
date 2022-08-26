import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { Delete } from '../../useCases/s3/lib/delete'

export class DeleteController { 
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const responses = new Responses()
        try {
            const handleDelete = new Delete()

            const dataDelete = await handleDelete.execute(id);

            if(dataDelete.error){
                return responses.ParamsError(res, dataDelete.message)
            }

            return responses.res200(res, dataDelete.data, "Foto deletada com sucesso.");
        } catch (e) {
            return responses.InternalError(res, e)
        }
    }
}