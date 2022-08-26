import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { IChangePasswordUseCase } from "../../../useCases/user/resetPassword/IChangePasswordUseCase";
import { ICodeVerifyUseCase } from "../../../useCases/user/resetPassword/ICodeVerifyUseCase";
import { ISendCodeUseCase } from "../../../useCases/user/resetPassword/ISendCodeUseCase";

export class ResetPasswordController {
    constructor(
        private sendCodeUseCase: ISendCodeUseCase,
        private codeVerifyUseCase: ICodeVerifyUseCase,
        private changePasswordUseCase: IChangePasswordUseCase
    ){}

    async initRequest(req: Request, res: Response) {
        try {
            const { email } = req.body
            const resp = await this.sendCodeUseCase.execute(email);
            if(resp.error){
                return res.status(500).json({
                    error: true,
                    message: resp.message,
                    data: resp.data
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
                return res.status(500).json({
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

    async changePassword(req: Request, res: Response) {
        try {
            const { email, new_password, confirm_new_password } = req.body

            const resp = await this.changePasswordUseCase.execute(email, new_password, confirm_new_password);

            if(resp?.error){
                return res.status(500).json({
                    error: true,
                    message: resp.message
                })
            }

            return res.status(200).json({
                error: false,
                message: resp?.message,
                data: resp?.data
            })
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res.status(404).json({
                        error: true,
                        message: "Usuário não encontrado."
                    });
                } else {
                    return res.status(500).json({
                        error: true,
                        message: "Erro interno de servidor, contate o suporte."
                    });
                }
            }
        }
    }
}