import { UserRepository } from "../../../repository/implementations/UserRepository";
import { ListUsersUseCase } from "../../../useCases/user/ListUsersUseCase";
import { GetAllController } from "./getAllController";

export const getAllController = new GetAllController(
    new ListUsersUseCase(
        new UserRepository()
    )
)