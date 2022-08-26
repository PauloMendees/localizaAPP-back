import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleItem } from '../../useCases/item/Handle'

export class PutController{
    async handle(req: Request, res: Response){
        const responses = new Responses()
        try {
            const { andar, codigo_de_barras, descricao, dono, lido, localizacao, plaqueta, sequencial_localiza, tipo } = req.body
            const { id } = req.params

            const handleItem = new HandleItem()
            const data = await handleItem.put(id, sequencial_localiza, codigo_de_barras, plaqueta, andar, localizacao, descricao, dono, lido, tipo)
            if(data.error) return responses.ParamsError(res, data.message)
            return responses.res200(res, data, "Item alterado com sucesso.")
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