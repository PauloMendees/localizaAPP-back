import { IEmpresaRepository } from "../../repository/IEmpresaRepository";

export class ListUseCase {
    constructor(
        private repository: IEmpresaRepository
    ){}

    async execute(){
        try {
            const resp = await this.repository.getAll();

            return resp;
        } catch (e) {
            throw e;
        }
    }
}