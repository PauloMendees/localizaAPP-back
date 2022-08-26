import { User } from "@prisma/client"

export type ResponseCreate = {
    error: boolean,
    message: string,
    data?: User
}

export interface ICreateUseCase {
    execute(email: string, password: string, confirmPassword: string): Promise<ResponseCreate>
}