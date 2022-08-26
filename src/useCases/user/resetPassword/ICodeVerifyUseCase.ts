export type ResponseCodeVerify = {
    error: boolean,
    message: string
}

export interface ICodeVerifyUseCase {
    execute(code: string, email: string): Promise<ResponseCodeVerify>
}