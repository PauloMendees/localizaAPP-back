//Find unique user by id
import { Request, Response } from 'express'
import { HandleUser } from '../../useCases/user/Handle'

export class GetUserById {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params

            const handleUser = new HandleUser()
            const user = await handleUser.getUserById(id)

            if (user) return res.status(200).json({
                error: false,
                message: "Usuário encontrado.",
                data: user
            })

            return res.status(404).json({
                error: true,
                message: "Usuário não encontrado.",
                data: user
            })
        } catch (e) {
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: e
            });
        }
    }
}