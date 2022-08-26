import { IUserRepository } from "../../repository/IUserRepository";

export class VinculateUserUseCase {
    constructor(
        private repo: IUserRepository
    ){}

    async execute(idUser: string, idEmpresa: string){
        try {
            const res = await this.repo.vinculateEmpresa(idUser, idEmpresa);
            return res;
        } catch (e) {
            throw e;
        }
    }
}