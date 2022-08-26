import { User } from "../entities/Classes/User";
import { ReadUser } from "../entities/DTO/ReadUser";

export type ResType = {
    error: boolean,
    message: string,
    code: number,
    data?: User
}

export interface IUserRepository{
    getUsers(): Promise<ReadUser[]>
    deleteUser(id: string): Promise<void>;
    getUserById(id: string): Promise<ReadUser | null>;
    postUser(email: string, password: string, confirmPassword: string): Promise<ResType | null>;
    putUser(id: string, email: string): Promise<ResType | null>;
    verifyIfAlreadyExist(email: string): Promise<User | null>;
    vinculateEmpresa(idUser: string, idEmpresa: string): Promise<ResType | null>;
}