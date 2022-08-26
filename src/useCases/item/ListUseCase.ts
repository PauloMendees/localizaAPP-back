import { IItemRepository } from "../../repository/IItemRepository";

export class ListUseCase{
    constructor(
        private repository: IItemRepository
    ){}

    async execute(authToken: string){
        try {
            const resp = await this.repository.getAll(authToken);
            return resp
        } catch (e) {
            throw e
        }
    }
}