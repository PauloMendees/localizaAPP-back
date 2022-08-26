import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleItem } from '../../useCases/item/Handle'

export class GetItemByIdController {
    async handle(req: Request, res: Response) {
        const response = new Responses()
        try {
            const { id } = req.params
            const handleItems = new HandleItem()

            const item = await handleItems.getById(id as string);
            
            if(item) return response.res200(res, item, "Item buscado com sucesso.");
            return response.NotFound(res, "Item não encontrado.")

        } catch (e) {
            return response.InternalError(res);
        }
    }
}