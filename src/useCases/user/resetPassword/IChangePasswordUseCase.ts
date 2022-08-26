import { User } from "@prisma/client"

export type ChangePasswordResponse = {
    error: boolean,
    message: string,
    data?: User
}

export interface IChangePasswordUseCase {
    execute(email: string, new_password: string, confirm_new_password: string): Promise<ChangePasswordResponse>
}