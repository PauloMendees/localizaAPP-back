import { IUserRepository } from "../../repository/IUserRepository";

export class ListUsersUseCase{
    constructor(
        private repo: IUserRepository
    ){}

    async execute(){
        try {
            return await this.repo.getUsers();
        } catch (e) {
            throw e;
        }
    }
}