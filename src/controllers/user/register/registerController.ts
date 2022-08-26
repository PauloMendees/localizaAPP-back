import { Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { ICodeVerifyUseCase } from '../../../useCases/user/register/ICodeVerifyUseCase'
import { ISendCodeUseCase } from '../../../useCases/user/register/ISendCodeUseCase'
import { ICreateUseCase } from '../../../useCases/user/register/ICreateUseCase'

export class RegisterController {
    constructor(
        private sendCodeUseCase: ISendCodeUseCase,
        private codeVerifyUseCase: ICodeVerifyUseCase,
        private createUseCase: ICreateUseCase
    ){}

    async sendCode(req: Request, res: Response) {
        try {
            const {email} = req.body
            const resp = await this.sendCodeUseCase.execute(email)
            if(resp.error){
                return res.status(406).json({
                    error: true,
                    message: resp.message
                })
            }
            return res.status(200).json({
                error: false,
                message: resp.message,
                data: resp.data
            })
        } catch (e) {
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: e
            });
        }
    }

    async codeVerify(req: Request, res: Response) {
        try {
            const { code, email } = req.body

            const resp = await this.codeVerifyUseCase.execute(code, email)

            if(resp.error){
                return res.status(406).json({
                    error: true,
                    message: resp.message
                })
            }
            return res.status(200).json({
                error: false,
                message: resp.message
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(406).json({
                        error: true,
                        message: "Email já cadastrado."
                    });
                }
            }
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: error
            })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword } = req.body

            const resp = await this.createUseCase.execute(email, password, confirmPassword);

            return res.status(200).json({
                error: false,
                message: "Usuário criado com sucesso.",
                data: resp.data
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(406).json({
                        error: true,
                        message: "Email já cadastrado."
                    });
                }
            }
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: error
            })
        }
    }
}