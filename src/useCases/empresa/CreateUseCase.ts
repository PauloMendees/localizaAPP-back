import { IEmpresaRepository } from "../../repository/IEmpresaRepository";

export class CreateUseCase{
    constructor(
        private repository: IEmpresaRepository
    ){}

    async execute(name: string){
        try {
            const resp = await this.repository.post(name);
            return resp
        } catch (e) {
            throw e;
        }
    }
}