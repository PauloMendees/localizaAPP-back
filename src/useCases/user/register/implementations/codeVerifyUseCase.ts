import { Prisma } from "@prisma/client";
import { UserCodeRepository } from "../../../../repository/implementations/UserCodeRepository"
import { ICodeVerifyUseCase, ResponseCodeVerify } from "../ICodeVerifyUseCase";

export class CodeVerifyUsecase implements ICodeVerifyUseCase {
    constructor(
        private repo: UserCodeRepository
    ){}

    async execute(code: string, email: string): Promise<ResponseCodeVerify>{
        try {

            const codeValidation = await this.repo.verifyCode(email, code)

            if (codeValidation.valid) {
                return {
                    error: false,
                    message: codeValidation.token,
                    data: codeValidation
                }
            }
            return {
                error: true,
                message: "Código inválido.",
                data: []
            }
        } catch (error) {
            throw error
        }
    }
}