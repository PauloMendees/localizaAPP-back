import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleItem } from '../../useCases/item/Handle'

export class GetAllItemsController {
    async handle(req: Request, res: Response) {
        const responses = new Responses()
        try {
            const handleItems = new HandleItem()
            const list = await handleItems.getAll()

            return responses.res200(res, list, "Listas buscadas com sucesso.")
        } catch (e) {
            return responses.InternalError(res);
        }
    }
}