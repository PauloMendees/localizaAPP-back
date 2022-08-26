export type ResponseCodeVerify  = {
    error: boolean,
    message: string | undefined,
    data: any
}

export interface ICodeVerifyUseCase {
    execute(code: string, email: string): Promise<ResponseCodeVerify>
}