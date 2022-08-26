import { IItemRepository } from "../../repository/IItemRepository";

export class AddImageUseCase {
    constructor(
        private repository: IItemRepository
    ){}

    async execute(id: string, url: string, authToken: string){
        try {
            const resp = await this.repository.addImage(id, url, authToken)
            return resp;
        } catch (e) {
            throw e;
        }
    }
}