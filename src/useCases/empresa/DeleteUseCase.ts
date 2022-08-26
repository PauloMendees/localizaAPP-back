import { IEmpresaRepository } from "../../repository/IEmpresaRepository";

export class DeleteUseCase {
    constructor(
      private repository: IEmpresaRepository  
    ){}

    async execute(id: string){
        try {
            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}