export type ResponseSendCode = {
    error: boolean,
    message: string,
    data?: any,
    hashed_code?: any
}

export interface ISendCodeUseCase {
    execute(email: string): Promise<ResponseSendCode>
}