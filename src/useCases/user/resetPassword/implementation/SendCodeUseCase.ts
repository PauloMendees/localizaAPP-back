import { prismaClient } from "../../../../../prisma/prismaClient"
import { PasswordHash } from "../../../../providers/passwordHash"
import { SendEmailService } from "../../../../providers/sendEmailResetPassword"
import { Validations } from "../../../../providers/validations"
import { ISendCodeUseCase, ResponseSendCode } from "../ISendCodeUseCase"

export class SendCodeUseCase implements ISendCodeUseCase{
    constructor(
        private validate: Validations,
        private emailService: SendEmailService,
        private hash: PasswordHash
    ){}
    async execute(email: string): Promise<ResponseSendCode>{
        try {

            const emailIsValid = this.validate.emailValidate(email)

            //Validando se email é válido
            if (!emailIsValid) {
                return {
                    error: true,
                    message: "Email inválido."
                }
            }
            const user = await prismaClient.user.findFirst({
                where: {
                    email
                }
            })

            //Validando se usuário está cadastrado
            if (!user) {
                return {
                    error: true,
                    message: "Não foi encontrado nenhum usuário com este email."
                }
            }

            //Gerando código aleatório
            const code = await Math.random().toString(36).substring(2, 6).toUpperCase();

            //Criptografando código
            const cryptographedCode = await this.hash.createHash(code)

            //Enviando código via email
            const infoEmail = await this.emailService.sendResetPassword(email, code)

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

                return {
                    error: false,
                    message: "Email enviado.",
                    data: infoEmail,
                    hashed_code: savedHashedCode
                }
            } else {
                return {
                    error: true,
                    message: "Erro interno de servidor, favor contate o suporte.",
                    data: infoEmail
                }
            }
        } catch (e) {
            throw e
        }
    }
}