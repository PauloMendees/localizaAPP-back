export type ResponseCharge = {
    error: boolean,
    message: string,
    data: any
}

export interface IHandleChargeDataBase {
    charge(file: Express.Multer.File): Promise<ResponseCharge>
}