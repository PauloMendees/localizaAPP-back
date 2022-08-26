import { prismaClient } from "../../../../../prisma/prismaClient";
import { PasswordHash } from "../../../../providers/passwordHash";
import { Validations } from "../../../../providers/validations";
import { IUserRepository } from "../../../../repository/IUserRepository";
import { ICreateUseCase, ResponseCreate } from "../ICreateUseCase";

export class CreateUseCase implements ICreateUseCase {
    constructor(
        private repo: IUserRepository,
        private validate: Validations,
        private hash: PasswordHash
    ){}

    async execute(email: string, password: string, confirmPassword: string): Promise<ResponseCreate>{
        try {
            const password_hash = await this.hash.createHash(password)
            const cannotBeCreated = await this.validate.validateUser(email, password, confirmPassword)

            const verifyIfAlreadyExist = await this.repo.verifyIfAlreadyExist(email)

            if (verifyIfAlreadyExist) {
                return {
                    error: true,
                    message: "Email já registrado"
                }
            }

            if (cannotBeCreated.error) {
                return {
                    error: true,
                    message: cannotBeCreated.message
                }
            }

            const createdUser = await prismaClient.user.create({
                data: {
                    email,
                    password_hash
                }
            })

            return {
                error: false,
                message: "Usuário criado com sucesso.",
                data: createdUser
            }
        } catch (e) {
            throw e
        }
    }
}