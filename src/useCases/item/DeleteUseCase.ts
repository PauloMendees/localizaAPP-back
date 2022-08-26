import { ItemRepository } from "../../repository/implementations/ItemRepository";

export class DeleteUseCase {
    constructor(
        private repository: ItemRepository
    ){}

    async execute(id: string, authToken: string){
        try {
            await this.repository.delete(id, authToken)
        } catch (e) {
            throw e
        }
    }
}