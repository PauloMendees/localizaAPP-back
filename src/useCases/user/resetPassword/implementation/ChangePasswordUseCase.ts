import { prismaClient } from "../../../../../prisma/prismaClient"
import { PasswordHash } from "../../../../providers/passwordHash"
import { Validations } from "../../../../providers/validations"
import { ChangePasswordResponse, IChangePasswordUseCase } from "../IChangePasswordUseCase"

export class ChangePasswordUseCase implements IChangePasswordUseCase {
    constructor(
        private hash: PasswordHash,
        private validate: Validations
    ){}

    async execute(email: string, new_password: string, confirm_new_password: string): Promise<ChangePasswordResponse>{
        try {
            const passwordConfirmation = await this.validate.confirmPasswordValidate(new_password, confirm_new_password)
            const passwordIsValid = await this.validate.validPassword(new_password)
            const password_hash = await this.hash.createHash(new_password)

            if (passwordIsValid && passwordConfirmation) {
                const user = await prismaClient.user.update({
                    where: {
                        email
                    },
                    data: {
                        password_hash
                    }
                })

                return {
                    error: false,
                    message: "Senha alterada com sucesso.",
                    data: user
                }
            } else if (!passwordIsValid) {
                return {
                    error: true,
                    message: "Senha inválida, deve have 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial."
                }
            }
            else if (!passwordConfirmation) {
                return {
                    error: true,
                    message: "Senhas não conferem."
                }
            } else {
                return {
                    error: true,
                    message: "Problema com serviço."
                }
            }
        } catch (e) {
            throw e;
        }
    }
}