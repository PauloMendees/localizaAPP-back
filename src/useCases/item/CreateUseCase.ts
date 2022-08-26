import { IItemRepository, ItemCreateDTO } from "../../repository/IItemRepository";

export class CreateUseCase {
    constructor(
        private repository: IItemRepository
    ){}

    async execute(props: ItemCreateDTO, authToken: string){
        try {
            const resp = await this.repository.post(props, authToken);
            return resp;
        } catch (e) {
            throw e;
        }
    }
}