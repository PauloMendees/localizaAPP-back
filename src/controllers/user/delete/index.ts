import { UserRepository } from "../../../repository/implementations/UserRepository";
import { DeleteUserUseCase } from "../../../useCases/user/DeleteUserUseCase";
import { DeleteController } from "./deleteController";

export const deleteController = new DeleteController(
    new DeleteUserUseCase(
        new UserRepository()
    )
)