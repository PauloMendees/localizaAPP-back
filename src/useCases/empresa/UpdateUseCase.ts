import { IEmpresaRepository } from "../../repository/IEmpresaRepository";

export class UpdateUseCase{
    constructor(
        private repository: IEmpresaRepository
    ){}

    async execute(id: string, name: string){
        try {
            const resp = await this.repository.put(id, name);
            return resp
        } catch (e) {
            throw e;
        }
    }
}