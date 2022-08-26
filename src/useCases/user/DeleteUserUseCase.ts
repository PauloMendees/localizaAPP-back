import { IUserRepository } from "../../repository/IUserRepository";

export class DeleteUserUseCase {
    constructor(
        private repo: IUserRepository
    ){}

    async execute(id: string){
        try {
            await this.repo.deleteUser(id);
        } catch (e) {
            throw e;
        }
    }
}