import { IItemRepository, ItemCreateDTO } from "../../repository/IItemRepository";

export class UpdateUseCase {
    constructor(
        private repository: IItemRepository
    ){}

    async execute(id: string, item: ItemCreateDTO, authToken: string){
        try {
            const resp = await this.repository.put(id, item, authToken)
            return resp;
        } catch (e) {
            throw e;
        }
    }
}