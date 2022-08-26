import { GenerateCode } from "../../../../providers/generateCode";
import { PasswordHash } from "../../../../providers/passwordHash";
import { SendEmailService } from "../../../../providers/sendEmailRegisterUser";
import { Validations } from "../../../../providers/validations";
import { IUserCodeRepository } from "../../../../repository/IUserCodeRepository";
import { IUserRepository } from "../../../../repository/IUserRepository";
import { ISendCodeUseCase, ResponseSendCode } from "../ISendCodeUseCase";

export class SendCodeUseCase implements ISendCodeUseCase {
    constructor(
        private userRepo: IUserRepository,
        private codeRepo: IUserCodeRepository,
        private validate: Validations,
        private emailService: SendEmailService,
        private hash: PasswordHash
    ){}

    async execute(email: string): Promise<ResponseSendCode>{
        try {
            const user = await this.userRepo.verifyIfAlreadyExist(email)
            
            if (user) {
                return {
                    error: true,
                    message: "Email já cadastrado.",
                    data: []
                }
            }

            const emailIsValid = this.validate.emailValidate(email);
            if (!emailIsValid) return {
                error: true,
                message: "Email inválido.",
                data: []
            }

            const code = await GenerateCode()
            
            const emailInfo = await this.emailService.sendCode(email, code);
            
            await this.codeRepo.deleteRegisterCodes(email)

            if (!emailInfo.error) {
                const cryptographedCode = await this.hash.createHash(code)

                const bd_code = await this.codeRepo.registerUserCode(email, cryptographedCode)

                return {
                    error: false,
                    message: emailInfo.message,
                    data: emailInfo.data
                }
            } else {
                return {
                    error: true,
                    message: emailInfo.message,
                    data: emailInfo.data
                }
            }
        } catch (e) {
            return {
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: e
            }
        }
    }
}