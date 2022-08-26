import { IItemRepository } from "../../repository/IItemRepository";

export class FindByIdUseCase{
    constructor(
        private repository: IItemRepository
    ){}

    async execute(id: string, authToken: string){
        try {
            const resp = await this.repository.getById(id, authToken);
            if(resp) return resp;
            return null;
        } catch (e) {
            throw e;
        }
    }
}