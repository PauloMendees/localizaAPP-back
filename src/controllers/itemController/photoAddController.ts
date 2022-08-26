import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleItem } from '../../useCases/item/Handle'

export class PhotoController{
    async handle(req: Request, res: Response){
        const responses = new Responses()
        try {
            const { foto_url } = req.body
            const { id } = req.params

            const handleItem = new HandleItem()
            const data = await handleItem.addImage(id, foto_url);
            
            if(data.error) return responses.ParamsError(res, data.message)
            return responses.res200(res, data, "Foto adicionada com sucesso.")
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return responses.NotFound(res, "Item não encontrado.");
                }else{
                    return responses.InternalError(res, e)
                }
            }
        }
    }
}