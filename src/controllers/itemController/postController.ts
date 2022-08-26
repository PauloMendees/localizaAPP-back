import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleItem } from '../../useCases/item/Handle'

export class PostController{
    async handle(req: Request, res: Response){
        const responses = new Responses()
        try {
            const { andar, codigo_de_barras, descricao, dono, lido, localizacao, plaqueta, sequencial_localiza, tipo } = req.body
            const handleItems = new HandleItem();
            const data = await handleItems.post(sequencial_localiza, codigo_de_barras, plaqueta, andar, localizacao, descricao, dono, lido, tipo);

            return responses.Created(res, data, "Item registrado com sucesso.");
        } catch (error) {
            return responses.InternalError(res, error)
        }
    }
}