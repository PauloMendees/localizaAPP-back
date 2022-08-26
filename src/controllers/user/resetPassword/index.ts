import { PasswordHash } from "../../../providers/passwordHash"
import { SendEmailService } from "../../../providers/sendEmailResetPassword"
import { Validations } from "../../../providers/validations"
import { ChangePasswordUseCase } from "../../../useCases/user/resetPassword/implementation/ChangePasswordUseCase"
import { RegisterCodeVerifyUseCase } from "../../../useCases/user/resetPassword/implementation/RegisterCodeVerifyUseCase"
import { SendCodeUseCase } from "../../../useCases/user/resetPassword/implementation/SendCodeUseCase"
import { ResetPasswordController } from "./resetPasswordController"

const sendCodeUseCase = new SendCodeUseCase(
    new Validations(),
    new SendEmailService(),
    new PasswordHash()
)

const codeVerifyUseCase = new RegisterCodeVerifyUseCase(new PasswordHash())

const changePasswordUseCase = new ChangePasswordUseCase(
    new PasswordHash(),
    new Validations()
)

export const resetPasswordController = new ResetPasswordController(
    sendCodeUseCase,
    codeVerifyUseCase,
    changePasswordUseCase
)