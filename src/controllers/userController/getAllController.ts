//Controller to get all user's
import { Request, Response } from 'express'
import { HandleUser } from '../../useCases/user/Handle'

export class GetAllUsers {
    async handle(req: Request, res: Response){
        try {
            const handleUser = new HandleUser()

            const userList = await handleUser.getUsers()

            return res.status(200).json({
                error: false,
                data: userList
            })
        } catch (e) {
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: e
            })
        }
    }
}