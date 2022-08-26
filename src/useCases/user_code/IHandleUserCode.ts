import { RegisterUserCode } from "@prisma/client"

type VerifyData = {
    valid: boolean,
    token?: string
}

export interface IHandleUserCode {
    deleteRegisterCodes(email: string): Promise<void>
    registerUserCode(email: string, hashedCode: string): Promise<RegisterUserCode>;
    verifyCode(email: string, code: string): Promise<VerifyData>
}