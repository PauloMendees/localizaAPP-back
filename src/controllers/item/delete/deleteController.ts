import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../../lib/response';
import { DeleteUseCase } from '../../../useCases/item/DeleteUseCase';
import { Delete } from '../../../useCases/s3/lib/delete';

export class DeleteController {
    constructor(
        private responses: Responses,
        private useCase: DeleteUseCase,
        private s3Delete: Delete
    ){}

    async handle(req: Request, res: Response){
        const authToken = req.headers.authorization;
        if(!authToken) return res.status(401).json({
            error: true,
            message: "Você não tem permissão para realizar essa ação."
        })
        try {
            const { id } = req.params
            const dataS3delete = await this.s3Delete.execute(id)
            if(!dataS3delete.error){
                await this.useCase.execute(id as string, authToken);
                return this.responses.res200(res, [], "Item deletado com sucesso.");
            } else {
                await this.useCase.execute(id as string, authToken);
                return this.responses.res200(res, [], "Item deletado, contudo houve um erro ao deletar a imagem vinculada.")
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return this.responses.NotFound(res, "Item não encontrado.")
                } else {
                    return this.responses.InternalError(res)
                }
            }
        }
    }
}