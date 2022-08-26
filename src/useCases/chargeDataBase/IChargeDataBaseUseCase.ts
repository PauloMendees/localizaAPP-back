export type ResponseCharge = {
    error: boolean,
    message: string,
    data: any
}

export interface IChargeDataBaseUseCase {
    charge(file: Express.Multer.File, authToken: string): Promise<ResponseCharge>
}