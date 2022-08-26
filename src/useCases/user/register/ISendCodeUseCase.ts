export type ResponseSendCode = {
    error: boolean,
    message: string | undefined,
    data: any
}

export interface ISendCodeUseCase {
    execute(email: string): Promise<ResponseSendCode>
}