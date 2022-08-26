import { Request, Response } from 'express'
import { prismaClient } from '../../../prisma/prismaClient'
import { PasswordHash } from '../../providers/passwordHash'
import { SendEmailService } from '../../providers/sendEmailResetPassword'
import { Validations } from '../../providers/validations'
import { sign } from 'jsonwebtoken'
import { env } from "process";
import { Prisma } from '@prisma/client'

export class ResetPassword {
    async initRequest(req: Request, res: Response) {
        try {
            const { email } = req.body
            const validations = new Validations()

            const emailIsValid = validations.emailValidate(email)
            const sendEmail = new SendEmailService()
            const cryptograph = new PasswordHash()

            //Validando se email é válido
            if (!emailIsValid) {
                return res.status(406).json({
                    error: true,
                    message: "Email inválido."
                })
            }
            const user = await prismaClient.user.findFirst({
                where: {
                    email
                }
            })

            //Validando se usuário está cadastrado
            if (!user) {
                return res.status(404).json({
                    error: true,
                    message: "Não foi encontrado nenhum usuário com este email."
                })
            }

            //Gerando código aleatório
            const code = await Math.random().toString(36).substring(2, 6).toUpperCase();

            //Criptografando código
            const cryptographedCode = await cryptograph.createHash(code)

            //Enviando código via email
            const infoEmail = await sendEmail.sendResetPassword(email, code)

            if (!infoEmail.error) {
                //Deletando códigos já existentes
                const deleteCode = await prismaClient.resetPasswordCode.deleteMany({
                    where: {
                        email
                    }
                })

                //Salvando código no bd
                const savedHashedCode = await prismaClient.resetPasswordCode.create({
                    data: {
                        email,
                        hashed_code: cryptographedCode
                    }
                })

                return res.status(200).json({
                    error: false,
                    message: "Email enviado.",
                    data: infoEmail,
                    hashed_code: savedHashedCode
                })
            } else {
                return res.status(500).json({
                    error: true,
                    message: "Erro interno de servidor, favor contate o suporte.",
                    data: infoEmail
                });
            }
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

            const hashService = new PasswordHash()
            //Finding a code with this email
            const bd_code = await prismaClient.resetPasswordCode.findFirst({
                where: {
                    email
                }
            })

            if (bd_code) {
                //verifying if the code ir the right code
                const codeMatch = await hashService.comparePassword(code, bd_code.hashed_code)
                if (!codeMatch) return res.status(404).json({
                    error: true,
                    message: "Código inválido."
                })

                const token = sign({}, `${env.RESET_PASSWORD_ACCESS_TOKEN_SECRET}`, {
                    subject: email,
                    expiresIn: "3600s"
                })

                const deleteCode = await prismaClient.resetPasswordCode.deleteMany({
                    where: {
                        email
                    }
                })

                return res.status(200).json({
                    error: false,
                    message: token
                })
            }
            return res.status(404).json({
                error: true,
                message: "Código não encontrado."
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

            const cryptograph = new PasswordHash()
            const validations = new Validations()
            const passwordConfirmation = await validations.confirmPasswordValidate(new_password, confirm_new_password)
            const passwordIsValid = await validations.validPassword(new_password)
            const password_hash = await cryptograph.createHash(new_password)

            if (passwordIsValid && passwordConfirmation) {
                const user = await prismaClient.user.update({
                    where: {
                        email
                    },
                    data: {
                        password_hash
                    }
                })

                return res.status(200).json({
                    error: false,
                    message: "Senha alterada com sucesso.",
                    data: user
                })
            } else if (!passwordIsValid) {
                return res.status(406).json({
                    error: true,
                    message: "Senha inválida, deve have 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial."
                })
            }
            else if (!passwordConfirmation) {
                return res.status(406).json({
                    error: true,
                    message: "Senhas não conferem."
                })
            }

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